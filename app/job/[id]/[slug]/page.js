import { Suspense } from "react";
import { notFound } from "next/navigation";
import Loading from "@/app/job/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";
import Sidebar from "@/layout/job/sidebar";
import UseMap from "@/components/global/usemap";

async function getJob(params) {
	const res = await fetchurl(`/global/jobs${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const JobRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const getJobsData = getJob(`/${awtdParams.id}`);

	const [job] = await Promise.all([getJobsData]);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={job.data.title}
				description={job.data.excerpt || job.data.text}
				// favicon=""
				postImage=""
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
			<div className="bg-black py-5 text-bg-dark">
				<div className="container">
					<div className="row">
						<Globalcontent>
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
						<Sidebar />
					</div>
				</div>
			</div>
		</Suspense>
	);
};

export default JobRead;
