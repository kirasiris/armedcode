// import { notFound } from "next/navigation";
// import List from "@/components/api/list";
// import JsonResponses from "@/components/global/jsonresponses";
// import { fetchurl, getAPITokenOnServer } from "@/helpers/fetchurl";
// import Header from "@/layout/api/header";
// import TabMenu from "@/layout/api/tabmenu";
// import ErrorPage from "@/layout/errorpage";
// import ParseHtml from "@/layout/parseHtml";

// async function getAuthenticatedUser() {
// 	const res = await fetchurl(`/auth/me`, "GET", "no-cache");
// 	return res;
// }

// async function getSetting(params) {
// 	const res = await fetchurl(`/settings/${params}`, "GET", "default");
// 	return res;
// }

// async function getWeapons(params) {
// 	const res = await fetchurl(`/weapons${params}`, "GET", "no-cache");
// 	// if (!res.success) notFound();
// 	return res;
// }

// async function getWeapon(params) {
// 	const res = await fetchurl(`/weapons${params}`, "GET", "no-cache");
// 	// if (!res.success) notFound(); // Not needed
// 	return res;
// }

// const ApiReadSingle = async ({ params, searchParams }) => {
// 	const awtdParams = await params;
// 	const awtdSearchParams = await searchParams;

// 	const auth = await getAuthenticatedUser();

// 	const apitoken = await getAPITokenOnServer();

// 	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

// 	const page = awtdSearchParams.page || 1;
// 	const limit = awtdSearchParams.limit || 5;
// 	const sort = awtdSearchParams.sort || "-createdAt";

// 	const getWeaponsData = getWeapons(
// 		`?user=${auth?.data?._id}&page=${page}&limit=${limit}&sort=${sort}&status=published&decrypt=true`
// 	);

// 	const getWeaponData = getWeapon(`/${awtdParams.id}`);

// 	const [weapons, weapon] = await Promise.all([getWeaponsData, getWeaponData]);

// 	return settings?.data?.maintenance === false ? (
// 		<section className="bg-black text-bg-dark py-5">
// 			<div className="container">
// 				<Header />
// 				<TabMenu />
// 				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
// 					<div className="card-header">
// 						<h3>Retrieve Weapon Records</h3>
// 						<p className="text-secondary">
// 							View and search your NFA item collection
// 						</p>
// 					</div>
// 					<div className="card-body">
// 						<div className="row">
// 							<div className="col-lg-6">
// 								<div className="bg-dark p-4 mb-3 rounded">
// 									<p>Your Weapons Collection</p>
// 									<List objects={weapons} searchParams={awtdSearchParams} />
// 								</div>
// 								{weapon.data?.status === "published" ||
// 								awtdSearchParams.isAdmin === "true" ? (
// 									<div className="bg-dark p-4 mb-3 rounded">
// 										<p>Selected Weapon Details</p>
// 										<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
// 											<div className="card-header d-flex justify-content-between align-items-center">
// 												<div>
// 													<small className="text-secondary">Manufacturer</small>
// 													<p className="mb-1">
// 														{weapon.data?.manufacturer || "No manufacturer"}
// 													</p>
// 													<small className="text-secondary">Type</small>
// 													<p className="mb-1">
// 														{weapon.data?.type || "No type"}
// 													</p>
// 													<small className="text-secondary">
// 														Serial Number
// 													</small>
// 													<p className="mb-1">
// 														{weapon.data?.serialNumber || "No serial number"}
// 													</p>
// 												</div>
// 												<div>
// 													<small className="text-secondary">Model</small>
// 													<p className="mb-0">
// 														{weapon.data?.title || "No model"}
// 													</p>
// 													<small className="text-secondary">Caliber</small>
// 													<p className="mb-0">
// 														{weapon.data?.caliber || "No caliber"}
// 													</p>
// 													<small className="text-secondary">
// 														NFA Classification
// 													</small>
// 													<p className="mb-0">
// 														{weapon.data?.nfaClassification ||
// 															"No NFA classification"}
// 													</p>
// 												</div>
// 											</div>
// 											<div className="card-body">
// 												<small className="text-secondary">Notes</small>
// 												<ParseHtml
// 													text={weapon.data?.text || "No text"}
// 													parseAs="p"
// 												/>
// 											</div>
// 										</div>
// 									</div>
// 								) : (
// 									<div className="alert alert-secondary">
// 										Secret token required
// 									</div>
// 								)}
// 							</div>
// 							<div className="col-lg-6">
// 								<p>API Reference</p>
// 								<div className="bg-dark p-4 mb-3 rounded">
// 									<h6>
// 										<span className="badge rounded-pill text-bg-light me-2">
// 											GET
// 										</span>
// 										/v1/weapons
// 									</h6>
// 									<p className="text-secondary">
// 										Retrieves all weapons in your collection.
// 									</p>
// 									<div className="d-flex gap-2">
// 										<JsonResponses
// 											text={`fetch('${
// 												process.env.NEXT_PUBLIC_API_URL
// 											}/weapons', {
//   method: "GET",
//   headers: {
//     'armed_code_sk': '${apitoken?.value || "12345abcdef67890"}',
//     'Content-Type': 'application/json'
//   },
// })`}
// 										/>
// 									</div>
// 								</div>
// 								<div className="bg-dark p-4 mb-3 rounded">
// 									<h6>
// 										<span className="badge rounded-pill text-bg-light me-2">
// 											GET
// 										</span>
// 										/v1/weapons/:id
// 									</h6>
// 									<p className="text-secondary">
// 										Retrieves a specific weapon by ID.
// 									</p>
// 									<div className="d-flex gap-2">
// 										<JsonResponses
// 											text={`fetch('${
// 												process.env.NEXT_PUBLIC_API_URL
// 											}/weapons/${weapon.data?._id}', {
//   method: "GET",
//   headers: {
//     'armed_code_sk': '${apitoken?.value || "12345abcdef67890"}',
//     'Content-Type': 'application/json'
//   },
// })`}
// 										/>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	) : (
// 		<ErrorPage />
// 	);
// };

// export default ApiReadSingle;
"use client";
import { useEffect, useState } from "react";
import {
	notFound,
	useParams,
	useRouter,
	useSearchParams,
} from "next/navigation";
import List from "@/components/api/list";
import JsonResponses from "@/components/global/jsonresponses";
import { fetchurl, getAPITokenOnServer } from "@/helpers/fetchurl";
import Header from "@/layout/api/header";
import TabMenu from "@/layout/api/tabmenu";
import ErrorPage from "@/layout/errorpage";
import ParseHtml from "@/layout/parseHtml";
import { checkEmptyObject } from "befree-utilities";

// async function getAuthenticatedUser() {
// 	const res = await fetchurl(`/auth/me`, "GET", "no-cache");
// 	return res;
// };

// async function getSetting(params) {
// 	const res = await fetchurl(`/settings/${params}`, "GET", "default");
// 	return res;
// }

// async function getWeapons(params) {
// 	const res = await fetchurl(`/weapons${params}`, "GET", "no-cache");
// 	// if (!res.success) notFound();
// 	return res;
// }

// async function getWeapon(params) {
// 	const res = await fetchurl(`/weapons${params}`, "GET", "no-cache");
// 	// if (!res.success) notFound(); // Not needed
// 	return res;
// }

const ApiReadSingle = ({}) => {
	const router = useRouter();
	const params = useParams();
	const searchParams = useSearchParams();
	console.log("params", params);
	console.log("searchParams", searchParams);
	console.log("router", router);
	const [settings, setSettings] = useState({});
	const [weapon, setWeapon] = useState({});
	const [weapons, setWeapons] = useState([]);
	const [loadingsettings, setLoadingSettings] = useState(true);
	const [loading, setLoading] = useState(true);
	const [loadingWeapons, setLoadingWeapons] = useState(true);

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
				setSettings(res.data); // Then set the rest of them
				setLoadingSettings(false);
			}
		};
		fetchSettings();
		return () => abortController.abort();
	}, []);

	// Fetch all weapons
	useEffect(() => {
		const abortController = new AbortController();
		const fetchWeapons = async () => {
			const res = await fetchurl(
				`/weapons`,
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
		fetchWeapons();
		return () => abortController.abort();
	}, []);

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

	const loadWeapon = async (id) => {
		router.push(`/api/read/${id}`, { scroll: false });
	};

	console.log("settings", settings);
	console.log("weapon", weapon);
	console.log("weapons", weapons);

	// const awtdParams = await params;
	// const awtdSearchParams = await searchParams;

	// const auth = await getAuthenticatedUser();

	// const apitoken = await getAPITokenOnServer();

	// const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	// const page = awtdSearchParams.page || 1;
	// const limit = awtdSearchParams.limit || 5;
	// const sort = awtdSearchParams.sort || "-createdAt";

	// const getWeaponsData = getWeapons(
	// 	`?user=${auth?.data?._id}&page=${page}&limit=${limit}&sort=${sort}&status=published&decrypt=true`
	// );

	// const getWeaponData = getWeapon(`/${awtdParams.id}`);

	// const [weapons, weapon] = await Promise.all([getWeaponsData, getWeaponData]);

	return settings?.data?.maintenance === false ? (
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
									{/* <List objects={weapons} searchParams={awtdSearchParams} /> */}
								</div>
								{/* {weapon.data?.status === "published" ||
								awtdSearchParams.isAdmin === "true" ? (
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
								{/* <div className="bg-dark p-4 mb-3 rounded">
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
    'armed_code_sk': '${apitoken?.value || "12345abcdef67890"}',
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
											}/weapons/${weapon.data?._id}', {
  method: "GET",
  headers: {
    'armed_code_sk': '${apitoken?.value || "12345abcdef67890"}',
    'Content-Type': 'application/json'
  },
})`}
										/>
									</div>
								</div> */}
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
