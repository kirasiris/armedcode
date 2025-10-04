import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/job/list";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getJobs(params) {
	const res = await fetchurl(
		`/global/jobs${params}&status=published`,
		"GET",
		"no-cache"
	);
	return res;
}

const JobIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getJobsData = getJobs(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`
	);

	const [jobs] = await Promise.all([getJobsData]);

	return settings?.data?.maintenance === false ? (
		<List objects={jobs} searchParams={awtdSearchParams} />
	) : (
		<ErrorPage />
	);
};

export default JobIndex;
