import { fetchurl } from "@/helpers/fetchurl";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getCompanies(params) {
	const res = await fetchurl(
		`/global/companies${params}&status=published`,
		"GET",
		"no-cache"
	);
	return res;
}

const CompanyIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getNFATransfersData = getCompanies(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`
	);

	const [companies] = await Promise.all([getNFATransfersData]);

	return settings?.data?.maintenance === false ? (
		<>Nothing to show here</>
	) : (
		<ErrorPage />
	);
};

export default CompanyIndex;
