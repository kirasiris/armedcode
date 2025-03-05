import { notFound } from "next/navigation";
import { formatDateWithoutTime } from "befree-utilities";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";
import NotVisiblePage from "@/layout/notvisiblepage";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/settings/${params}`, "GET", "default");
	return res;
}

async function getPage(params) {
	const res = await fetchurl(`/pages${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const TermsOfServiceIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);
	const page = await getPage(
		`/${process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_PAGE_ID}`
	);

	return settings?.data?.maintenance === false ? (
		<section className="bg-dark py-5 text-bg-dark">
			<div className="container">
				{page.data.status === "published" || awtdParams.isAdmin === "true" ? (
					<div className="row">
						<div className="col-lg-12">
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
						</div>
					</div>
				) : (
					<NotVisiblePage />
				)}
			</div>
		</section>
	) : (
		<ErrorPage />
	);
};

export default TermsOfServiceIndex;
