"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { checkEmptyObject } from "befree-utilities";
import List from "@/components/api/list";
import JsonResponses from "@/components/global/jsonresponses";
import { fetchurl } from "@/helpers/fetchurl";
import Header from "@/layout/api/header";
import TabMenu from "@/layout/api/tabmenu";
import ErrorPage from "@/layout/errorpage";
import ParseHtml from "@/layout/parseHtml";

const ApiReadSingle = ({}) => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();
	const cookies = useCookies();
	const apitoken = cookies.get("armed_code_sk");
	console.log("apitoken", apitoken);
	console.log("params", params);
	console.log("searchParams", searchParams);
	console.log("router", router);
	const [auth, setAuth] = useState({});
	const [settings, setSettings] = useState({});
	const [weapon, setWeapon] = useState({});
	const [weapons, setWeapons] = useState([]);
	const [loadingAuth, setLoadingAuth] = useState(true);
	const [loadingsettings, setLoadingSettings] = useState(true);
	const [loading, setLoading] = useState(true);
	const [loadingWeapons, setLoadingWeapons] = useState(true);

	// Fetch authenticated user
	useEffect(() => {
		const abortController = new AbortController();
		const fetchAuthenticatedUser = async () => {
			const res = await fetchurl(
				`/auth/me`,
				"GET",
				"default",
				{},
				abortController.signal,
				false,
				false
			);
			if (res?.data) {
				setAuth(res.data);
				setLoadingAuth(false);
			}
		};
		fetchAuthenticatedUser();
		return () => abortController.abort();
	}, []);

	// Fetch settings
	useEffect(() => {
		const abortController = new AbortController();
		const fetchSettings = async () => {
			const res = await fetchurl(
				`/settings/${process.env.NEXT_PUBLIC_SETTINGS_ID}`,
				"GET",
				"default",
				{},
				abortController.signal,
				false,
				false
			);
			if (res?.data) {
				setSettings(res.data);
				setLoadingSettings(false);
			}
		};
		fetchSettings();
		return () => abortController.abort();
	}, []);

	// Fetch all weapons
	useEffect(() => {
		const abortController = new AbortController();
		const fetchWeapons = async (params) => {
			const res = await fetchurl(
				`/weapons${params}`,
				"GET",
				"default",
				{},
				abortController.signal,
				false,
				false
			);
			if (res?.data) {
				checkEmptyObject(searchParams) && setWeapon(res.data[0]); // Display the most recent weapon
				setWeapons(res.data); // Then set the rest of them
				setLoading(false);
				setLoadingWeapons(false);
			}
		};
		fetchWeapons(
			`?user=${
				auth && auth?._id
			}&page=1&limit=5&sort=-createdAt&status=published&decrypt=true`
		);
		return () => abortController.abort();
	}, [searchParams]);

	// Fetch single weapon
	useEffect(() => {
		const abortController = new AbortController();
		const fetchWeapon = async (id) => {
			const res = await fetchurl(
				`/weapons/${id}`,
				"GET",
				"default",
				{},
				abortController.signal,
				false,
				false
			);
			if (res?.data) {
				setWeapon(res.data);
				setLoading(false);
			} else {
				router.push(`/api/read`, { scroll: false });
			}
		};
		if (!checkEmptyObject(searchParams)) {
			setLoading(true);
			fetchWeapon(searchParams._id);
		}
		return () => abortController.abort();
	}, [router, searchParams]);

	console.log("authenticated user", auth);
	console.log("This is the api token", apitoken);
	console.log("settings", settings);
	console.log("weapon", weapon);
	console.log("weapons", weapons);

	return settings?.maintenance === false ? (
		<section className="bg-black text-bg-dark py-5">
			<div className="container">
				<Header />
				<TabMenu />
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<div className="card-header">
						<h3>Retrieve Weapon Records</h3>
						<p className="text-secondary">
							View and search your NFA item collection
						</p>
					</div>
					<div className="card-body">
						<div className="row">
							<div className="col-lg-6">
								<div className="bg-dark p-4 mb-3 rounded">
									<p>Your Weapons Collection</p>
									{loadingWeapons ? (
										<p>Loading...</p>
									) : (
										<List
											objects={weapons}
											params={params}
											searchParams={searchParams}
											router={router}
										/>
									)}
								</div>
								{/* {weapon.status === "published" ||
								searchParams.isAdmin === "true" ? (
									<div className="bg-dark p-4 mb-3 rounded">
										<p>Selected Weapon Details</p>
										<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
											<div className="card-header d-flex justify-content-between align-items-center">
												<div>
													<small className="text-secondary">Manufacturer</small>
													<p className="mb-1">
														{weapon.data?.manufacturer || "No manufacturer"}
													</p>
													<small className="text-secondary">Type</small>
													<p className="mb-1">
														{weapon.data?.type || "No type"}
													</p>
													<small className="text-secondary">
														Serial Number
													</small>
													<p className="mb-1">
														{weapon.data?.serialNumber || "No serial number"}
													</p>
												</div>
												<div>
													<small className="text-secondary">Model</small>
													<p className="mb-0">
														{weapon.data?.title || "No model"}
													</p>
													<small className="text-secondary">Caliber</small>
													<p className="mb-0">
														{weapon.data?.caliber || "No caliber"}
													</p>
													<small className="text-secondary">
														NFA Classification
													</small>
													<p className="mb-0">
														{weapon.data?.nfaClassification ||
															"No NFA classification"}
													</p>
												</div>
											</div>
											<div className="card-body">
												<small className="text-secondary">Notes</small>
												<ParseHtml
													text={weapon.data?.text || "No text"}
													parseAs="p"
												/>
											</div>
										</div>
									</div>
								) : (
									<div className="alert alert-secondary">
										Secret token required
									</div>
								)} */}
							</div>
							<div className="col-lg-6">
								<p>API Reference</p>
								<div className="bg-dark p-4 mb-3 rounded">
									<h6>
										<span className="badge rounded-pill text-bg-light me-2">
											GET
										</span>
										/v1/weapons
									</h6>
									<p className="text-secondary">
										Retrieves all weapons in your collection.
									</p>
									<div className="d-flex gap-2">
										<JsonResponses
											text={`fetch('${
												process.env.NEXT_PUBLIC_API_URL
											}/weapons', {
  method: "GET",
  headers: {
    'armed_code_sk': ${apitoken || "12345abcdef67890"},
    'Content-Type': 'application/json'
  },
})`}
										/>
									</div>
								</div>
								<div className="bg-dark p-4 mb-3 rounded">
									<h6>
										<span className="badge rounded-pill text-bg-light me-2">
											GET
										</span>
										/v1/weapons/:id
									</h6>
									<p className="text-secondary">
										Retrieves a specific weapon by ID.
									</p>
									<div className="d-flex gap-2">
										<JsonResponses
											text={`fetch('${
												process.env.NEXT_PUBLIC_API_URL
											}/weapons/TO_UPDATE', {
  method: "GET",
  headers: {
	'armed_code_sk': ${apitoken || "12345abcdef67890"},
    'Content-Type': 'application/json'
  },
})`}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	) : (
		<ErrorPage />
	);
};

export default ApiReadSingle;
