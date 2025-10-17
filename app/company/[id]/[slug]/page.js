import { Suspense } from "react";
import { notFound } from "next/navigation";
import Loading from "@/app/realstate/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";
import JobSingle from "@/components/job/single";
import RealStateSingle from "@/components/realstates/single";
import ProductSingle from "@/components/store/single";

async function getCompany(params) {
	const res = await fetchurl(`/global/companies${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

async function getJobs(params) {
	const res = await fetchurl(`/global/jobs${params}`, "GET", "no-cache");
	return res;
}

async function getRealStates(params) {
	const res = await fetchurl(`/global/realstates${params}`, "GET", "no-cache");
	return res;
}

async function getProduct(params) {
	const res = await fetchurl(`/global/products${params}`, "GET", "no-cache");
	return res;
}

const CompanyRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const company = await getCompany(`/${awtdParams.id}`);
	const jobs = await getJobs(
		`?resourceId=${company?.data?._id}&page=1&limit=10&sort=-createdAt`
	);
	const realstates = await getRealStates(
		`?resourceId=${company?.data?._id}&page=1&limit=10&sort=-createdAt`
	);
	const products = await getProduct(
		`?resourceId=${company?.data?._id}&page=1&limit=10&sort=-createdAt`
	);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={company.data.title}
				description={company.data.excerpt || company.data.text}
				// favicon=""
				postImage={company.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category={company.data.type}
				url={`/company/${company.data._id}/${company.data.slug}`}
				author={company.data.user.name}
				createdAt={company.data.createdAt}
				updatedAt={company.data.updatedAt}
				locales=""
				posType="blog"
			/>
			<div className="bg-black py-5 text-bg-dark">
				<div className="container">
					{company.data.status === "published" ||
					awtdSearchParams.isAdmin === "true" ? (
						<div className="row">
							<Globalcontent classList={`col-lg-12`}>
								<article>
									<h1>{company?.data?.title}</h1>
									<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
										<div className="card-body">
											<ParseHtml
												text={company?.data?.text}
												classList="text-secondary"
											/>
										</div>
									</div>
									<h2>Jobs</h2>
									<div className="row">
										{jobs?.data?.map((job) => (
											<JobSingle key={job._id} object={job} />
										))}
									</div>
									<h2>Real Estates</h2>
									<div className="row">
										{realstates?.data?.map((property) => (
											<RealStateSingle key={property._id} object={property} />
										))}
									</div>
									<h2>Products</h2>
									<div className="row">
										{products?.data?.map((product) => (
											<ProductSingle key={product._id} object={product} />
										))}
									</div>
								</article>
							</Globalcontent>
						</div>
					) : (
						<p>Not visible</p>
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default CompanyRead;
