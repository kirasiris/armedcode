import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/realstates/list";
import ErrorPage from "@/layout/errorpage";
import Header from "@/layout/header";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getRealStates(params) {
	const res = await fetchurl(
		`/global/realstates${params}&status=published`,
		"GET",
		"no-cache"
	);
	return res;
}

const RealStateIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getRealStatesData = getRealStates(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`
	);

	const [realstates] = await Promise.all([getRealStatesData]);

	return settings?.data?.maintenance === false ? (
		<>
			<Header
				title="Find Your Dream Property"
				description="Discover exceptional homes, land, and investment opportunities across the country. Your perfect property is waiting."
			/>
			<section className="bg-black py-5 text-bg-dark">
				<div className="container">
					<div className="row">
						<div className="col text-center border my-border-color py-5">
							<i aria-hidden className="fa-solid fa-house fa-2x" />
							<p className="mb-0">500+</p>
							<p className="text-secondary">Properties Listed</p>
						</div>
						<div className="col text-center border my-border-color py-5">
							<i aria-hidden className="fa-solid fa-user fa-2x" />
							<p className="mb-0">1,200+</p>
							<p className="text-secondary">Happy Clients</p>
						</div>
						<div className="col text-center border my-border-color py-5">
							<i aria-hidden className="fa-solid fa-location-dot fa-2x" />
							<p className="mb-0">50+</p>
							<p className="text-secondary">Cities Covered</p>
						</div>
						<div className="col text-center border my-border-color py-5">
							<i aria-hidden className="fa-solid fa-arrow-trend-up fa-2x" />
							<p className="mb-0">98%</p>
							<p className="text-secondary">Success Rate</p>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-dark py-5 text-bg-dark">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">HERE GOES THE FORM</div>
					</div>
				</div>
			</section>
			<List
				objects={realstates}
				searchedKeyword=""
				searchParams={awtdSearchParams}
			/>
		</>
	) : (
		<ErrorPage />
	);
};

export default RealStateIndex;
