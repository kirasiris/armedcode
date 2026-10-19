"use client";
import Link from "next/link";

// Same rules as CompanyMapExplorer, so "Show on map" only appears for pins that exist.
const hasValidCoordinates = (company) => {
	const raw = company?.location?.coordinates;
	if (!Array.isArray(raw) || raw.length < 2) return false;

	const [lng, lat] = raw.map(Number);
	return (
		Number.isFinite(lng) &&
		Number.isFinite(lat) &&
		Math.abs(lat) <= 90 &&
		Math.abs(lng) <= 180
	);
};

const getAddress = (company) =>
	company?.location?.formattedAddress || company?.address || "";

const getAvatar = (company) =>
	company?.files?.avatar?.location?.secure_location || "";

const initialsOf = (title = "") =>
	title
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0].toUpperCase())
		.join("") || "?";

// website is user-entered; only allow http(s) so a `javascript:` URL can't run.
const toSafeUrl = (value) => {
	if (!value) return "";
	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:"
			? url.href
			: "";
	} catch {
		return "";
	}
};

const Single = ({ company, href, active, onHover, onShowOnMap }) => {
	const avatar = getAvatar(company);
	const address = getAddress(company);
	const hasCoordinates = hasValidCoordinates(company);
	const website = toSafeUrl(company.website);

	return (
		<li
			id={`company-${company._id}`}
			className={`list-group-item py-3 ${active ? "bg-primary-subtle" : ""}`}
			onMouseEnter={() => onHover(company._id)}
			onMouseLeave={() => onHover(null)}
			onFocus={() => onHover(company._id)}
			onBlur={() => onHover(null)}
		>
			<div className="d-flex gap-3">
				{avatar ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={avatar}
						alt=""
						width={56}
						height={56}
						loading="lazy"
						className="rounded border object-fit-cover flex-shrink-0"
					/>
				) : (
					<div
						className="rounded bg-secondary-subtle text-secondary-emphasis d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
						style={{ width: 56, height: 56 }}
						aria-hidden="true"
					>
						{initialsOf(company.title)}
					</div>
				)}

				<div className="flex-grow-1" style={{ minWidth: 0 }}>
					<div className="d-flex justify-content-between align-items-start gap-2">
						<h2 className="h6 mb-1 text-truncate">
							<Link href={href} className="text-decoration-none">
								{company.title}
							</Link>
						</h2>
						<button
							type="button"
							className={`btn btn-sm flex-shrink-0 ${
								active ? "btn-primary" : "btn-outline-primary"
							}`}
							onClick={() => onShowOnMap(company._id)}
							disabled={!hasCoordinates}
							aria-pressed={active}
							title={hasCoordinates ? "Show on map" : "No location"}
						>
							<i className="fa-solid fa-map-pin" aria-hidden="true" />
							<span className="visually-hidden">
								{hasCoordinates
									? `Show ${company.title} on map`
									: "No location"}
							</span>
						</button>
					</div>

					{address && (
						<p className="small text-body-secondary mb-1">
							<i className="fa-solid fa-location-dot me-1" aria-hidden="true" />
							{address}
						</p>
					)}

					{company.excerpt && company.excerpt !== "No excerpt" && (
						<p className="small mb-1 text-truncate">{company.excerpt}</p>
					)}

					<ul className="list-inline small mb-0">
						{company.phoneNumber && (
							<li className="list-inline-item">
								<a
									href={`tel:${company.phoneNumber}`}
									className="link-secondary"
								>
									<i className="fa-solid fa-phone me-1" aria-hidden="true" />
									{company.phoneNumber}
								</a>
							</li>
						)}
						{website && (
							<li className="list-inline-item">
								<a
									href={website}
									target="_blank"
									rel="noreferrer"
									className="link-secondary"
								>
									<i className="fa-solid fa-globe me-1" aria-hidden="true" />
									Website
								</a>
							</li>
						)}
						{company.tags?.slice(0, 3).map((tag, index) => (
							<li key={`${tag}-${index}`} className="list-inline-item">
								<span className="badge text-bg-light border">{tag}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</li>
	);
};

export default Single;
