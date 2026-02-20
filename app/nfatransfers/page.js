import ErrorPage from "@/layout/errorpage";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

const NFATransfersIndex = async ({ params, searchParams }) => {
	const { settings } = await getGlobalData();

	return (
		<>
			<Head
				title={`${settings?.data?.title} - NFA Transfers`}
				description="Sorry. This page is no longer public"
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/nfatransfers`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<section className="bg-black py-5 text-bg-dark">
					<div className="container">
						<div className="row">
							<Globalcontent classList="col-lg-12">
								<article>
									<h1>Sorry</h1>
									<h2>This page is no longer public</h2>
									<p>The NFA Transfers are usually considered public record,</p>
									<p>
										however, some of the few customers that I have had so far
										have recorded their PII also.
									</p>
									<p>
										In order to protect them, this page will no longer be
										public.
									</p>
									<p>Thanks for your understanding</p>
								</article>
							</Globalcontent>
						</div>
					</div>
				</section>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default NFATransfersIndex;
