import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/nfatransfers/list";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getAcquisitionsDisposals(params) {
	const res = await fetchurl(
		`/global/weaponacquisitionsdisposals${params}&status=disposed`,
		"GET",
		"no-cache"
	);
	return res;
}

const NFATransfersIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getNFATransfersData = getAcquisitionsDisposals(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`
	);

	const [acquisitionsdisposals] = await Promise.all([getNFATransfersData]);

	return settings?.data?.maintenance === false ? (
		<List objects={acquisitionsdisposals} searchParams={awtdSearchParams} />
	) : (
		<ErrorPage />
	);
};

export default NFATransfersIndex;
