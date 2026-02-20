import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/job/list";
import ErrorPage from "@/layout/errorpage";
import Globalcontent from "@/layout/content";
import Header from "@/layout/header";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import SearchBar from "@/layout/job/searchbar";

async function getJobs(params) {
	const res = await fetchurl(
		`/global/jobs${params}&status=published`,
		"GET",
		"no-cache",
	);
	return res;
}

const JobSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword;
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

	const { settings } = await getGlobalData();

	const getJobsData = getJobs(
		`?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${experienceLevelQuery}${jobTypeQuery}${remoteQuery}${decrypt}`,
	);

	const [jobs] = await Promise.all([getJobsData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Search results of ${awtdSearchParams.keyword}`}
				description={"Search results..."}
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/job/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<>
					<Header title="" description="" />
					<section className="bg-dark py-5 text-bg-dark">
						<div className="container">
							<div className="row">
								<Globalcontent>
									<SearchBar />
								</Globalcontent>
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
			)}
		</>
	);
};

export default JobSearchIndex;
