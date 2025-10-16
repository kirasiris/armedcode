import { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDateWithoutTime } from "befree-utilities";
import Loading from "@/app/realstate/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";
import UseMap from "@/components/global/usemap";
import Globalsidebar from "@/layout/sidebar";
import Gallery from "@/components/realstates/gallery";

async function getRealState(params) {
	const res = await fetchurl(`/global/realstates${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const RealStateRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const getRealStatesData = getRealState(`/${awtdParams.id}`);

	const [realstate] = await Promise.all([getRealStatesData]);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={realstate.data.title}
				description={realstate.data.excerpt || realstate.data.text}
				// favicon=""
				postImage={realstate.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category={realstate.data.type}
				url={`/realstates/${realstate.data._id}/${realstate.data.slug}`}
				author={realstate.data.user.name}
				createdAt={realstate.data.createdAt}
				updatedAt={realstate.data.updatedAt}
				locales=""
				posType="blog"
			/>
			<div className="bg-black py-5 text-bg-dark">
				<div className="container">
					{realstate.data.status === "published" ||
					awtdSearchParams.isAdmin === "true" ? (
						<div className="row">
							<Gallery objects={realstate?.data?.files?.extras} />
							<Globalcontent classList={`col-lg-8`}>
								<article>
									<h1>{realstate?.data?.title}</h1>
									<p>
										<i aria-hidden className="fa-solid fa-location-dot me-2" />
										<span className="text-secondary">
											{realstate?.data?.location?.formattedAddress}
										</span>
									</p>
									<p>
										{realstate?.data?.businessType === "sale" && (
											<span className="fw-bold display-6">
												{realstate?.data?.price?.inHumanFormat}
											</span>
										)}
										{realstate?.data?.businessType === "rent" && (
											<>
												<span className="fw-bold display-6">
													${realstate?.data?.rates?.monthlyPrice?.inHumanFormat}
												</span>
												/<span className="text-secondary">month</span>
											</>
										)}
									</p>
									<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
										<div className="card-body">
											<h3 className="mb-4">Property Details</h3>
											<div className="row">
												<div className="col text-center">
													<i aria-hidden className="fa-solid fa-bed fa-2x" />
													<p className="mb-0">{realstate?.data?.bedrooms}</p>
													<p className="mb-0 text-secondary">Bedrooms</p>
												</div>
												<div className="col text-center">
													<i aria-hidden className="fa-solid fa-bath fa-2x" />
													<p className="mb-0">{realstate?.data?.bathrooms}</p>
													<p className="mb-0 text-secondary">Bathrooms</p>
												</div>
												<div className="col text-center">
													<i aria-hidden className="fa-solid fa-bath fa-2x" />
													<p className="mb-0">{realstate?.data?.squarefeet}</p>
													<p className="mb-0 text-secondary">Sq Ft</p>
												</div>
												<div className="col text-center">
													<i aria-hidden className="fa-solid fa-bath fa-2x" />
													<p className="text-capitalize mb-0">
														{realstate?.data?.type}
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
												text={realstate?.data?.text}
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
														realstate?.data?.amenities?.length > 10
															? "space-between"
															: "space-evenly",
												}}
											>
												{realstate?.data?.amenities.map((ameniti, index) => (
													<li
														key={index}
														className="text-capitalize"
														style={{ width: "13rem" }}
													>
														{ameniti.split("-").join(" ")}
													</li>
												))}
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
													{realstate?.data?.location?.street}
													<br />
													<span className="text-secondary">
														{realstate?.data?.location?.city},&nbsp;
														{realstate?.data?.location?.state}&nbsp;
														{realstate?.data?.location?.zipcode}
													</span>
												</p>
											</div>
											<UseMap object={realstate?.data} />
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
												{realstate?.data?.user.name}
												<br />
												<span className="text-secondary">
													Real&nbsp;Estate&nbsp;Agent
												</span>
											</p>
										</div>
										<hr />
										<a
											href={`mailto:${realstate?.data?.user?.email}?subject=${realstate?.data?.title}`}
											className="btn btn-secondary btn-sm w-100"
											target="_blank"
											rel="noreferrer noopener"
										>
											<i aria-hidden className="fa-solid fa-envelope me-2" />
											Send&nbsp;Message
										</a>
									</div>
								</div>
								<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
									<div className="card-body">
										<h3 className="mb-4">Property&nbsp;Information</h3>
										<ul className="list-unstyled">
											<li className="d-flex justify-content-between border-bottom my-border-color py-2">
												<span className="text-secondary">P.&nbsp;ID</span>
												<span>{realstate?.data?._id}</span>
											</li>
											<li className="d-flex justify-content-between border-bottom my-border-color py-2">
												<span className="text-secondary">Type</span>
												<span className="text-capitalize">
													{realstate?.data?.type}
												</span>
											</li>
											<li className="d-flex justify-content-between border-bottom my-border-color py-2">
												<span className="text-secondary">Status</span>
												<span className="text-capitalize">
													{realstate?.data?.status}
												</span>
											</li>
											<li className="d-flex justify-content-between border-bottom my-border-color py-2">
												<span className="text-secondary">Listed</span>
												<span>
													{formatDateWithoutTime(realstate?.data?.createdAt)}
												</span>
											</li>
											<li className="d-flex justify-content-between border-bottom my-border-color py-2">
												<span className="text-secondary">
													R.&nbsp;S.&nbsp;Agent
												</span>
												<span>{realstate?.data?.user?.name}</span>
											</li>
											<li className="d-flex justify-content-between border-bottom my-border-color py-2">
												<span className="text-secondary">Managed&nbsp;by</span>
												<span>{realstate?.data?.resourceId?.title}</span>
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
	);
};

export default RealStateRead;
