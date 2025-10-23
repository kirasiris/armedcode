import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/job/list";
import ErrorPage from "@/layout/errorpage";
import Header from "@/layout/header";
import SearchBar from "@/layout/job/searchbar";

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
	const experienceLevelQuery =
		awtdSearchParams.experience_level !== `` &&
		awtdSearchParams.experience_level !== undefined
			? `&experience_level=${awtdSearchParams.experience_level}`
			: "";
	const jobTypeQuery =
		awtdSearchParams.job_type !== `` && awtdSearchParams.job_type !== undefined
			? `&job_type=${awtdSearchParams.job_type}`
			: "";
	const remoteQuery =
		awtdSearchParams.remote !== `` && awtdSearchParams.remote !== undefined
			? `&remote=${awtdSearchParams.remote}`
			: "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getJobsData = getJobs(
		`?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${experienceLevelQuery}${jobTypeQuery}${remoteQuery}${decrypt}`
	);

	const [jobs] = await Promise.all([getJobsData]);

	return settings?.data?.maintenance === false ? (
		<>
			<Header title="" description="" />
			<section className="bg-dark py-5 text-bg-dark">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<SearchBar />
						</div>
					</div>
				</div>
			</section>
			<List
				objects={jobs}
				searchedKeyword={keyword}
				searchParams={awtdSearchParams}
			/>
		</>
	) : (
		<ErrorPage />
	);
};

export default JobSearchIndex;
