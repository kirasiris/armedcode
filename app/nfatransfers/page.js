import { fetchurl } from "@/helpers/fetchurl";
import ErrorPage from "@/layout/errorpage";
import Globalcontent from "@/layout/content";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

const NFATransfersIndex = async ({ params, searchParams }) => {
	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	return settings?.data?.maintenance === false ? (
		<section className="bg-black py-5 text-bg-dark">
			<div className="container">
				<div className="row">
					<Globalcontent classList="col-lg-12">
						<article>
							<h1>Sorry</h1>
							<h2>This page is no longer public</h2>
							<p>The NFA Transfers are usually considered public record,</p>
							<p>
								however, some of the few customers that I have had so far have
								recorded their PII also.
							</p>
							<p>
								In order to protect them, this page will no longer be public.
							</p>
							<p>Thanks for your understanding</p>
						</article>
					</Globalcontent>
				</div>
			</div>
		</section>
	) : (
		<ErrorPage />
	);
};

export default NFATransfersIndex;
