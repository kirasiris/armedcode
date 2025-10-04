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

const JobSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword;
	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const experience_levelQuery = awtdSearchParams.experience_level
		? `&experience_level=${awtdSearchParams.experience_level}`
		: "";
	const job_typeQuery =
		awtdSearchParams.job_type !== ""
			? `&job_type=${awtdSearchParams.job_type}`
			: "";
	const provides_trainingQuery =
		awtdSearchParams.provides_training === "true"
			? `&provides_training=true`
			: "&provides_training=false";
	const security_clearanceQuery =
		awtdSearchParams.security_clearance === "true"
			? `&security_clearance=true`
			: "&security_clearance=false";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getJobsData = getJobs(
		`?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${experience_levelQuery}${job_typeQuery}&starting_at=${awtdSearchParams.starting_at}${provides_trainingQuery}${security_clearanceQuery}${decrypt}`
	);

	const [jobs] = await Promise.all([getJobsData]);

	return settings?.data?.maintenance === false ? (
		<List
			objects={jobs}
			searchedKeyword={keyword}
			searchParams={awtdSearchParams}
		/>
	) : (
		<ErrorPage />
	);
};

export default JobSearchIndex;
