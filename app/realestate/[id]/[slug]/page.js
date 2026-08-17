import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
	formatDateWithoutTime,
	stripeCurrencyFormatter,
} from "befree-utilities";
import Loading from "@/app/realestate/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";
import UseMap from "@/components/global/usemap";
import Globalsidebar from "@/layout/sidebar";
import Gallery from "@/components/realestates/gallery";
import AddToCartButton from "@/components/realestates/addtocartbutton";
import ErrorPage from "@/layout/errorpage";
import { getGlobalData } from "@/helpers/globalData";

async function getRealEstate(params) {
	const res = await fetchurl(`/global/realestates${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const RealEstateRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const { settings } = await getGlobalData();

	const realestate = await getRealEstate(`/${awtdParams.id}`);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	return (
		<>
			<Head
				title={`${settings?.data?.title} - ${realestate.data.title}`}
				description={realestate.data.excerpt || realestate.data.text}
				favicon={settings?.data?.favicon}
				postImage={realestate.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category={realestate.data.buldingType}
				url={`/realestates/${realestate.data._id}/${realestate.data.slug}`}
				author={realestate.data.user.name}
				createdAt={realestate.data.createdAt}
				updatedAt={realestate.data.updatedAt}
				locales=""
				posType="blog"
			/>
			{settings?.data?.maintenance === false ? (
				<Suspense fallback={<Loading />}>
					<div className="bg-black py-5 text-bg-dark">
						<div className="container">
							{realestate.data.status === "published" ||
							awtdSearchParams.isAdmin === "true" ? (
								<div className="row">
									<Gallery objects={realestate?.data?.files?.extras} />
									<Globalcontent classList={`col-lg-8`}>
										<article>
											<h1>{realestate?.data?.title}</h1>
											<p>
												<i
													aria-hidden
													className="fa-solid fa-location-dot me-2"
												/>
												<span className="text-secondary">
													{realestate?.data?.location?.formattedAddress}
												</span>
											</p>
											<p>
												<span className="fw-bold display-6">
													{stripeCurrencyFormatter(
														realestate?.data?.price?.inCentsFormat,
													)}
												</span>
											</p>
											<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
												<div className="card-body">
													<h3 className="mb-4">Property Details</h3>
													<div className="row">
														<div className="col text-center">
															<i
																aria-hidden
																className="fa-solid fa-bed fa-2x"
															/>
															<p className="mb-0">
																{realestate?.data?.bedrooms}
															</p>
															<p className="mb-0 text-secondary">Bedrooms</p>
														</div>
														<div className="col text-center">
															<i
																aria-hidden
																className="fa-solid fa-bath fa-2x"
															/>
															<p className="mb-0">
																{realestate?.data?.bathrooms}
															</p>
															<p className="mb-0 text-secondary">Bathrooms</p>
														</div>
														<div className="col text-center">
															<i
																aria-hidden
																className="fa-solid fa-bath fa-2x"
															/>
															<p className="mb-0">
																{realestate?.data?.squarefeet}
															</p>
															<p className="mb-0 text-secondary">Sq Ft</p>
														</div>
														<div className="col text-center">
															<i
																aria-hidden
																className="fa-solid fa-bath fa-2x"
															/>
															<p className="text-capitalize mb-0">
																{realestate?.data?.buldingType}
															</p>
															<p className="mb-0 text-secondary">Type</p>
														</div>
													</div>
												</div>
											</div>
											<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
												<div className="card-body">
													<h3 className="mb-4">Description</h3>
													<ParseHtml
														text={realestate?.data?.text}
														classList="text-secondary"
													/>
												</div>
											</div>
											<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
												<div className="card-body">
													<h3 className="mb-4">Amenities</h3>
													<ul
														className="d-flex flex-wrap"
														style={{
															maxHeight: "calc(1.5rem * 5 + 1rem)", // roughly height for 5 items
															flexDirection: "column",
															alignContent:
																realestate?.data?.amenities?.length > 10
																	? "space-between"
																	: "space-evenly",
														}}
													>
														{realestate?.data?.amenities.map(
															(ameniti, index) => (
																<li
																	key={index}
																	className="text-capitalize"
																	style={{ width: "13rem" }}
																>
																	{ameniti.split("-").join(" ")}
																</li>
															),
														)}
													</ul>
												</div>
											</div>
											<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
												<div className="card-body">
													<h3 className="mb-4">Location</h3>
													<div className="d-flex align-items-baseline">
														<i
															aria-hidden
															className="fa-solid fa-location-dot me-2"
														/>
														<p>
															{realestate?.data?.location?.street}
															<br />
															<span className="text-secondary">
																{realestate?.data?.location?.city},&nbsp;
																{realestate?.data?.location?.state}&nbsp;
																{realestate?.data?.location?.zipcode}
															</span>
														</p>
													</div>
													<UseMap object={realestate?.data} />
												</div>
											</div>
										</article>
									</Globalcontent>
									<Globalsidebar>
										<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
											<div className="card-body">
												<h3 className="mb-4">Contact&nbsp;Agent</h3>
												<div className="d-flex align-items-baseline">
													<i aria-hidden className="fa-solid fa-user me-2" />
													<p>
														{realestate?.data?.user.name}
														<br />
														<span className="text-secondary">
															Real&nbsp;Estate&nbsp;Agent
														</span>
													</p>
												</div>
												<hr />
												<a
													href={`mailto:${realestate?.data?.user?.email}?subject=${realestate?.data?.title}`}
													className="btn btn-light btn-sm w-100 mb-3"
													target="_blank"
													rel="noreferrer noopener"
												>
													<i
														aria-hidden
														className="fa-solid fa-envelope me-2"
													/>
													Send&nbsp;Message
												</a>
												<AddToCartButton object={realestate?.data} />
											</div>
										</div>
										<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
											<div className="card-body">
												<h3 className="mb-4">Property&nbsp;Information</h3>
												<ul className="list-unstyled">
													<li className="d-flex justify-content-between border-bottom my-border-color py-2">
														<span className="text-secondary">P.&nbsp;ID</span>
														<span>{realestate?.data?._id}</span>
													</li>
													<li className="d-flex justify-content-between border-bottom my-border-color py-2">
														<span className="text-secondary">Type</span>
														<span className="text-capitalize">
															{realestate?.data?.buldingType}
														</span>
													</li>
													<li className="d-flex justify-content-between border-bottom my-border-color py-2">
														<span className="text-secondary">Status</span>
														<span className="text-capitalize">
															{realestate?.data?.status}
														</span>
													</li>
													<li className="d-flex justify-content-between border-bottom my-border-color py-2">
														<span className="text-secondary">Listed</span>
														<span>
															{formatDateWithoutTime(
																realestate?.data?.createdAt,
															)}
														</span>
													</li>
													<li className="d-flex justify-content-between border-bottom my-border-color py-2">
														<span className="text-secondary">
															R.&nbsp;E.&nbsp;Agent
														</span>
														<span>{realestate?.data?.user?.name}</span>
													</li>
													<li className="d-flex justify-content-between border-bottom my-border-color py-2">
														<span className="text-secondary">
															Managed&nbsp;by
														</span>
														<Link
															href={{
																pathname: `/company/${realestate?.data?.resourceId?._id}/${realestate?.data?.resourceId?.slug}`,
																query: {},
															}}
														>
															<span>{realestate?.data?.resourceId?.title}</span>
														</Link>
													</li>
												</ul>
											</div>
										</div>
									</Globalsidebar>
								</div>
							) : (
								<p>Not visible</p>
							)}
						</div>
					</div>
				</Suspense>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default RealEstateRead;
