import { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDateWithoutTime } from "befree-utilities";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import NotVisiblePage from "@/layout/notvisiblepage";
import ErrorPage from "@/layout/errorpage";
import Globalcontent from "@/layout/content";
import Loading from "@/app/privacy-policy/loading";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getPage(params) {
	const res = await fetchurl(`/global/pages${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const PrivacyPolicyIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const { settings } = await getGlobalData();

	const page = await getPage(
		`/${process.env.NEXT_PUBLIC_PRIVACY_POLICY_PAGE_ID}`,
	);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - ${page.data.title}`}
				description={settings.data.text}
				favicon={settings.data.favicon}
				postImage={settings.data.showcase_image}
				imageWidth="800"
				imageHeight="450"
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url="/privacy-of-policy"
				author={settings.data.author}
				createdAt={settings.data.createdAt}
				updatedAt={settings.data.updatedAt}
				locales=""
				posType="website"
			/>
			{settings?.data?.maintenance === false ? (
				<Suspense fallback={<Loading />}>
					<section className="bg-dark py-5 text-bg-dark">
						<div className="container">
							{page.data.status === "published" ||
							awtdParams.isAdmin === "true" ? (
								<div className="row">
									<Globalcontent classList="col-lg-12">
										<article>
											<div className="mb-3">
												<h1>{page?.data?.title}</h1>
												<div className="text-muted fst-italic mb-2">
													Posted&nbsp;on&nbsp;
													{formatDateWithoutTime(page?.data?.createdAt)}
													{page?.data?.user?.username && (
														<>
															&nbsp;by&nbsp;
															{page?.data?.user?.username}
														</>
													)}
												</div>
											</div>
											<ParseHtml text={page?.data?.text} />
										</article>
									</Globalcontent>
								</div>
							) : (
								<NotVisiblePage />
							)}
						</div>
					</section>
				</Suspense>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default PrivacyPolicyIndex;
