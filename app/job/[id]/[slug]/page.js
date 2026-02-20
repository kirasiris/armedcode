import { Suspense } from "react";
import { notFound } from "next/navigation";
import Loading from "@/app/job/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";
import UseMap from "@/components/global/usemap";
import ErrorPage from "@/layout/errorpage";
import { getGlobalData } from "@/helpers/globalData";

async function getJob(params) {
	const res = await fetchurl(`/global/jobs${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const JobRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const { settings } = await getGlobalData();

	const job = await getJob(`/${awtdParams.id}`);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	return (
		<>
			<Head
				title={`${settings?.data?.title} - ${job.data.title}`}
				description={job.data.excerpt || job.data.text}
				favicon={settings.data.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/job/${job.data._id}/${job.data.slug}`}
				author={job.data.user.name}
				createdAt={job.data.createdAt}
				updatedAt={job.data.updatedAt}
				locales=""
				posType="job"
			/>
			{settings?.data?.maintenance === false ? (
				<Suspense fallback={<Loading />}>
					<div className="bg-black py-5 text-bg-dark">
						<div className="container">
							<div className="row">
								<Globalcontent classList="col-lg-12">
									{job.data.status === "published" ||
									awtdSearchParams.isAdmin === "true" ? (
										<article>
											<section>
												<ParseHtml text={job?.data?.text} />
												<UseMap object={job?.data} />
											</section>
										</article>
									) : (
										<p>Not visible</p>
									)}
								</Globalcontent>
							</div>
						</div>
					</div>
				</Suspense>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default JobRead;
