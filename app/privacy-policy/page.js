import { notFound } from "next/navigation";
import { formatDateWithoutTime } from "befree-utilities";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";

async function getPage(params) {
	const res = await fetchurl(`/pages${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const PrivacyPolicyIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const page = await getPage(
		`/${process.env.NEXT_PUBLIC_PRIVACY_POLICY_PAGE_ID}`
	);

	return (
		<>
			{/* CONTACT US */}

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
					<p>Not visible</p>
				)}
			</div>
		</>
	);
};

export default PrivacyPolicyIndex;
