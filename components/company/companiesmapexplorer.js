"use client";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Map from "@/components/company/map";
import Single from "@/components/company/single";

// Coordinates are GeoJSON order: [lng, lat]. The API can send them as strings.
const getCoordinates = (company) => {
	const raw = company?.location?.coordinates;
	if (!Array.isArray(raw) || raw.length < 2) return null;

	const [lng, lat] = raw.map(Number);
	if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
	// Swapped lat/lng is the most common bad row; reject instead of mis-plotting.
	if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;

	return [lng, lat];
};

const getAddress = (company) =>
	company?.location?.formattedAddress || company?.address || "";

const toFeatureCollection = (companies) => {
	const features = [];

	for (const company of companies) {
		const coordinates = getCoordinates(company);
		if (!coordinates) continue;

		features.push({
			type: "Feature",
			geometry: { type: "Point", coordinates },
			properties: {
				id: company._id,
				title: company.title ?? "",
				address: getAddress(company),
			},
		});
	}

	return { type: "FeatureCollection", features };
};

// const defaultHref = (company) =>
// 	`/company/${encodeURIComponent(company._id ?? company.id ?? "")}/${encodeURIComponent(
// 		company.slug ?? "",
// 	)}`;

const defaultHref = (company) => `/company/${company?._id}/${company?.slug}`;

// The API answers an empty result set with this "fail" instead of an empty array.
const isEmptyResult = (res) =>
	res?.status === "fail" && /does not exist/i.test(res?.message ?? "");

const getHasMore = (res, pageLoaded, limit) => {
	if (res?.pagination?.next?.page) return true;
	const totalPages = Number(res?.pagination?.totalpages);
	if (Number.isFinite(totalPages)) return pageLoaded < totalPages;
	return (Array.isArray(res?.data) ? res.data.length : 0) >= limit;
};

const getData = (res) =>
	res?.success && Array.isArray(res.data) ? res.data : [];

const appendUnique = (list, incoming) => {
	const seen = new Set(list.map((company) => company._id));
	const fresh = incoming.filter((company) => {
		if (!company?._id || seen.has(company._id)) return false;
		seen.add(company._id);
		return true;
	});
	return fresh.length ? [...list, ...fresh] : list;
};

// Every page of data comes from app/companies/page.js: scrolling and searching
// only change ?page / ?keyword, the server fetches, and `objects` changes here.
// The explorer sets its own height: the map and list both use h-100, and a
// percentage height resolves to 0 unless every ancestor has a definite height,
// which a normal layout (navbar + <main>) doesn't. Pass e.g.
// height="calc(100dvh - 56px)" to leave room for a header.
const CompaniesMapExplorer = ({
	objects = {},
	searchParams = {},
	getHref = defaultHref,
	height = "100dvh",
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const [isPending, startTransition] = useTransition();

	// Defaults must match the ones in app/companies/page.js.
	const page = Number(searchParams?.page) || 1;
	const limit = Number(searchParams?.limit) || 10;
	const currentKeyword = (searchParams?.keyword ?? "").trim();

	const isEmpty = isEmptyResult(objects);
	const error =
		!objects?.success && !isEmpty
			? objects?.message || "Failed to retrieve companies"
			: null;
	const hasMore = !error && !isEmpty && getHasMore(objects, page, limit);
	const countAll = isEmpty
		? 0
		: typeof objects?.countAll === "number"
			? objects.countAll
			: null;

	const [companies, setCompanies] = useState(() =>
		appendUnique([], getData(objects)),
	);
	const [prevObjects, setPrevObjects] = useState(objects);
	const [listKeyword, setListKeyword] = useState(currentKeyword);

	const [hoveredId, setHoveredId] = useState(null);
	const [selection, setSelection] = useState(null);
	const [mobileView, setMobileView] = useState("list");

	// New server payload: a new search (or page 1) replaces the list, a later
	// page is appended. Adjusting state during render avoids a stale frame.
	if (objects !== prevObjects) {
		setPrevObjects(objects);
		const incoming = getData(objects);
		if (currentKeyword !== listKeyword || page === 1) {
			setCompanies(appendUnique([], incoming));
			if (currentKeyword !== listKeyword) {
				setListKeyword(currentKeyword);
				setSelection(null);
				setHoveredId(null);
			}
		} else if (incoming.length) {
			setCompanies((prev) => appendUnique(prev, incoming));
		}
	}

	const [keyword, setKeyword] = useState(currentKeyword);
	const [debouncedKeyword, setDebouncedKeyword] = useState(currentKeyword);

	const listRef = useRef(null);
	const sentinelRef = useRef(null);

	const navigate = (changes) => {
		const params = new URLSearchParams(window.location.search);
		for (const [key, value] of Object.entries(changes)) {
			if (value === null || value === "" || value === undefined)
				params.delete(key);
			else params.set(key, String(value));
		}
		const query = params.toString();
		startTransition(() => {
			// replace (not push): scrolling shouldn't fill the back button history.
			router.replace(query ? `${pathname}?${query}` : pathname, {
				scroll: false,
			});
		});
	};

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedKeyword(keyword.trim()), 400);
		return () => clearTimeout(timer);
	}, [keyword]);

	// The keyword goes to the server, so a search covers every company, not
	// only the pages already loaded.
	useEffect(() => {
		if (debouncedKeyword === currentKeyword) return;
		navigate({ keyword: debouncedKeyword, page: null });
		// navigate is recreated every render; the keyword pair is the real trigger.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedKeyword, currentKeyword]);

	useEffect(() => {
		listRef.current?.scrollTo({ top: 0 });
	}, [listKeyword]);

	const navigateRef = useRef(navigate);
	navigateRef.current = navigate;

	useEffect(() => {
		if (!hasMore || isPending) return;
		const node = sentinelRef.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				// One request per page: the observer is rebuilt once this page lands.
				observer.disconnect();
				navigateRef.current({ page: page + 1 });
			},
			// The sidebar scrolls, not the window, so it must be the root.
			{ root: listRef.current, rootMargin: "200px 0px" },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [page, hasMore, isPending]);

	const handleRetry = () => startTransition(() => router.refresh());

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		setDebouncedKeyword(keyword.trim());
	};

	const featureCollection = useMemo(
		() => toFeatureCollection(companies),
		[companies],
	);

	const handleSelect = (id, source) => {
		setSelection(id ? { id, source } : null);
	};

	const handleShowOnMap = (id) => {
		handleSelect(id, "list");
		setMobileView("map");
	};

	useEffect(() => {
		if (selection?.source !== "map") return;
		document
			.getElementById(`company-${selection.id}`)
			?.scrollIntoView({ block: "nearest", behavior: "smooth" });
	}, [selection]);

	const searching = isPending && debouncedKeyword !== currentKeyword;
	const activeId = hoveredId ?? selection?.id;
	const countLabel = `${companies.length}${
		countAll != null ? ` of ${countAll}` : ""
	} ${countAll === 1 ? "company" : "companies"}`;

	return (
		<div className="row g-0" style={{ height, minHeight: 480 }}>
			<section
				className={`col-lg-7 h-100 ${mobileView === "map" ? "" : "d-none"} d-lg-block`}
				aria-label="Map"
			>
				<Map
					featureCollection={featureCollection}
					fitKey={listKeyword}
					hoveredId={hoveredId}
					selection={selection}
					onSelect={handleSelect}
					onHover={setHoveredId}
					getHref={getHref}
				/>
			</section>

			<section
				className={`col-lg-5 h-100 flex-column border-start bg-body ${
					mobileView === "list" ? "d-flex" : "d-none"
				} d-lg-flex`}
				aria-label="Company results"
			>
				<div className="border-bottom p-3 bg-body-tertiary">
					<form onSubmit={handleSearchSubmit} role="search">
						<label htmlFor="keyword" className="visually-hidden">
							Search companies
						</label>
						<div className="input-group">
							<span className="input-group-text bg-body" aria-hidden="true">
								{searching ? (
									<span className="spinner-border spinner-border-sm text-primary" />
								) : (
									<i className="fa-solid fa-magnifying-glass text-body-secondary" />
								)}
							</span>
							<input
								id="keyword"
								name="keyword"
								type="search"
								className="form-control"
								placeholder="Search companies by name, city, tag..."
								value={keyword}
								onChange={(event) => setKeyword(event.target.value)}
								autoComplete="off"
							/>
							{keyword && (
								<button
									type="button"
									className="btn btn-outline-secondary"
									onClick={() => {
										setKeyword("");
										setDebouncedKeyword("");
									}}
									aria-label="Clear search"
								>
									<i className="fa-solid fa-xmark" aria-hidden="true" />
								</button>
							)}
						</div>
					</form>
					<div className="d-flex justify-content-between align-items-center mt-2 small">
						<span className="fw-semibold" aria-live="polite">
							{countLabel}
							{listKeyword ? ` for "${listKeyword}"` : ""}
						</span>
						<span className="text-body-secondary">
							<i className="fa-solid fa-location-dot me-1" aria-hidden="true" />
							{featureCollection.features.length} on map
						</span>
					</div>
				</div>

				<div
					ref={listRef}
					className="flex-grow-1 overflow-auto"
					aria-busy={isPending}
				>
					{companies.length > 0 && (
						<ul className="list-group list-group-flush">
							{companies.map((company) => (
								<Single
									key={company._id}
									company={company}
									href={getHref(company)}
									active={activeId === company._id}
									onHover={setHoveredId}
									onShowOnMap={handleShowOnMap}
								/>
							))}
						</ul>
					)}

					{!isPending && !error && !hasMore && companies.length === 0 && (
						<div className="text-center text-body-secondary py-5 px-3">
							<i
								className="fa-solid fa-map-location-dot fa-2x mb-3"
								aria-hidden="true"
							/>
							<p className="mb-1 fw-semibold">No companies found</p>
							<p className="small mb-0">
								{listKeyword
									? `Nothing matches "${listKeyword}". Try a different search.`
									: "There are no published companies yet."}
							</p>
						</div>
					)}

					<div ref={sentinelRef} className="text-center py-4 px-3">
						{isPending && (
							<div className="d-inline-flex align-items-center gap-2 text-body-secondary small">
								<div
									className="spinner-border spinner-border-sm text-primary"
									role="status"
								>
									<span className="visually-hidden">Loading...</span>
								</div>
								<span>Loading companies...</span>
							</div>
						)}
						{error && !isPending && (
							<div
								className="alert alert-danger d-flex align-items-center justify-content-between gap-2 mb-0 text-start"
								role="alert"
							>
								<span className="small">{error}</span>
								<button
									type="button"
									className="btn btn-sm btn-outline-danger"
									onClick={handleRetry}
								>
									Retry
								</button>
							</div>
						)}
						{!isPending && !error && !hasMore && companies.length > 0 && (
							<small className="text-body-secondary">
								No more companies to load.
							</small>
						)}
					</div>
				</div>
			</section>

			<div className="position-fixed bottom-0 start-50 translate-middle-x mb-3 d-lg-none z-3">
				<button
					type="button"
					className="btn btn-dark rounded-pill px-4 shadow"
					onClick={() => setMobileView(mobileView === "list" ? "map" : "list")}
				>
					<i
						className={`fa-solid ${mobileView === "list" ? "fa-map" : "fa-list"} me-2`}
						aria-hidden="true"
					/>
					{mobileView === "list" ? "Map" : "List"}
				</button>
			</div>
		</div>
	);
};

export default CompaniesMapExplorer;
