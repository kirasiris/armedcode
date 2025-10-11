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
