import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/realstate/loading";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import JobSingle from "@/components/job/single";
import RealStateSingle from "@/components/realstates/single";
import ProductSingle from "@/components/store/single";
import CompanyHeader from "@/components/company/header";
import { getGlobalData } from "@/helpers/globalData";

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

	const { settings } = await getGlobalData();

	const company = await getCompany(`/${awtdParams.id}`);
	const jobs = await getJobs(
		`?resourceId=${company?.data?._id}&page=1&limit=10&sort=-createdAt`,
	);
	const realstates = await getRealStates(
		`?resourceId=${company?.data?._id}&page=1&limit=10&sort=-createdAt`,
	);
	const products = await getProduct(
		`?resourceId=${company?.data?._id}&page=1&limit=10&sort=-createdAt`,
	);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	return (
		<>
			<Head
				title={`${settings?.data?.title} - ${company.data.title}`}
				description={company.data.excerpt || company.data.text}
				favicon={settings?.data?.favicon}
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
				posType="company"
			/>
			{settings?.data?.maintenance === false ? (
				<Suspense fallback={<Loading />}>
					<CompanyHeader object={company?.data} />
					<section className="bg-black py-5 text-bg-dark">
						<div className="container">
							{company.data.status === "published" ||
							awtdSearchParams.isAdmin === "true" ? (
								<div className="row">
									<Globalcontent classList={`col-lg-12`}>
										<Link
											href={{
												pathname: `/job`,
												query: {
													resourceId: company?.data?._id,
													page: 1,
													limit: 10,
													sort: "-createdAt",
												},
											}}
										>
											<h2>Jobs</h2>
										</Link>
										<div className="row">
											{jobs?.data?.map((job) => (
												<JobSingle key={job._id} object={job} />
											))}
										</div>
										<Link
											href={{
												pathname: `/realstate`,
												query: {
													resourceId: company?.data?._id,
													page: 1,
													limit: 10,
													sort: "-createdAt",
												},
											}}
										>
											<h2>Real Estates</h2>
										</Link>
										<div className="row">
											{realstates?.data?.map((property) => (
												<RealStateSingle key={property._id} object={property} />
											))}
										</div>
										<Link
											href={{
												pathname: `/store`,
												query: {
													resourceId: company?.data?._id,
													page: 1,
													limit: 10,
													sort: "-createdAt",
												},
											}}
										>
											<h2>Products</h2>
										</Link>

										<div className="row">
											{products?.data?.map((product) => (
												<ProductSingle key={product._id} object={product} />
											))}
										</div>
									</Globalcontent>
								</div>
							) : (
								<p>Not visible</p>
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

export default CompanyRead;
