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

const JobIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getJobsData = getJobs(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`,
	);

	const [jobs] = await Promise.all([getJobsData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Jobs`}
				description="Looking for a new position?"
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/job`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<>
					<Header title="Jobs" description="Looking for a new position?" />
					<section className="bg-dark py-5 text-bg-dark">
						<div className="container">
							<div className="row">
								<Globalcontent classList="col-lg-12">
									<SearchBar />
								</Globalcontent>
							</div>
						</div>
					</section>
					<List
						objects={jobs}
						searchedKeyword=""
						searchParams={awtdSearchParams}
					/>
				</>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default JobIndex;
