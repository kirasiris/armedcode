import { Suspense } from "react";
import { notFound } from "next/navigation";
import Loading from "@/app/nfatransfers/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getAcquisitionsDisposals(params) {
	const res = await fetchurl(
		`/global/weaponacquisitionsdisposals${params}`,
		"GET",
		"no-cache",
	);
	if (!res.success) notFound();
	return res;
}

const NFATransferRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const { settings } = await getGlobalData();

	const acquisitionsdisposal = await getAcquisitionsDisposals(
		`/${awtdParams.id}`,
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
				title={`${settings?.data?.title} - ${acquisitionsdisposal.data.title}`}
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
				url={`/nfatransfers/${acquisitionsdisposal.data._id}`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<>
					<Suspense fallback={<Loading />}>
						<div className="bg-black py-5 text-bg-dark">
							<div className="container">
								{acquisitionsdisposal.data.status === "disposed" ||
								awtdSearchParams.isAdmin === "true" ? (
									<div className="row">
										<div className="col-lg-6">
											<h6 className="display-6">Description</h6>
											<label htmlFor="manufacturer" className="form-label">
												Manufacturer and/or Importer
											</label>
											<input
												id="manufacturer"
												name="manufacturer"
												defaultValue={acquisitionsdisposal?.data?.manufacturer}
												type="text"
												className="form-control text-bg-dark mb-3"
												required
												placeholder="Ruger"
												disabled
											/>
											<label htmlFor="title" className="form-label">
												Model
											</label>
											<input
												id="title"
												name="title"
												defaultValue={acquisitionsdisposal?.data?.title}
												type="text"
												className="form-control text-bg-dark mb-3"
												required
												placeholder="M4A1"
												disabled
											/>
											<label htmlFor="type" className="form-label">
												Type
											</label>
											<select
												id="type"
												name="type"
												defaultValue={acquisitionsdisposal?.data?.type}
												className="form-control text-bg-dark mb-3"
												required
												disabled
											>
												<option value="none">Choose an option</option>
												<option value="rifle">Rifle</option>
												<option value="shotgun">Shotgun</option>
												<option value="pistol">Pistol</option>
												<option value="supressor">Supressor</option>
												<option value="short-barrel-rifle">
													Short Barrel Rifle
												</option>
												<option value="short-barrel-shotgun">
													Short Barrel Shotgun
												</option>
												<option value="any-other-weapon">
													Any Other Weapon
												</option>
												<option value="destructive-device">
													Destructive Device
												</option>
												<option value="machine-gun">Machine Gun</option>
											</select>
											<label htmlFor="caliber" className="form-label">
												Caliber
											</label>
											<input
												id="caliber"
												name="caliber"
												defaultValue={acquisitionsdisposal?.data?.caliber}
												type="text"
												className="form-control text-bg-dark mb-3"
												required
												placeholder="5.56x45mm NATO"
												disabled
											/>
											<label htmlFor="serialNumber" className="form-label">
												Serial Number
											</label>
											<input
												id="serialNumber"
												name="serialNumber"
												defaultValue={acquisitionsdisposal?.data?.serialNumber}
												type="text"
												className="form-control text-bg-dark mb-3"
												placeholder="COL123456"
												disabled
											/>
										</div>
										<div className="col-lg-6">
											<h6 className="display-6">Receipt</h6>
											<label htmlFor="fromWhomReceived" className="form-label">
												From Whom Received
											</label>
											<input
												id="fromWhomReceived"
												name="fromWhomReceived"
												defaultValue={
													acquisitionsdisposal?.data?.fromWhomReceived
												}
												type="text"
												className="form-control text-bg-dark"
												required
												placeholder="Shootsmart"
												disabled
											/>
											<small className="mb-3">
												Name and Address or Name and License Number
												&quot;FFL&quot;
											</small>
											<h6 className="display-6">Disposal</h6>
											<label htmlFor="name" className="form-label">
												Name
											</label>
											<input
												id="name"
												name="name"
												defaultValue={acquisitionsdisposal?.data?.name}
												type="text"
												className="form-control text-bg-dark mb-3"
												required
												placeholder="John Doe"
												disabled
											/>
											<label htmlFor="email" className="form-label">
												Email
											</label>
											<input
												id="email"
												name="email"
												defaultValue={acquisitionsdisposal?.data?.email}
												type="email"
												className="form-control text-bg-dark mb-3"
												placeholder="john@doe.com"
												disabled
											/>
											<label htmlFor="address" className="form-label">
												Address
											</label>
											<input
												id="address"
												name="address"
												defaultValue={acquisitionsdisposal?.data?.address}
												type="text"
												className="form-control text-bg-dark"
												required
												placeholder=""
												disabled
											/>
											<small className="mb-3">
												Or Form 4473 Serial Number if Forms 4473 Filed
												Numerically
											</small>
										</div>
										<h6 className="display-6">Delivery Information</h6>
										<div className="col-lg-6">
											<label htmlFor="trackingCompany" className="form-label">
												Tracking Company
											</label>
											<select
												id="trackingCompany"
												name="trackingCompany"
												defaultValue={
													acquisitionsdisposal?.data?.delivery.trackingCompany
												}
												className="form-control text-bg-dark mb-3"
												disabled
											>
												<option value="none">None</option>
												<option value="ups">UPS</option>
												<option value="fedex">FedEx</option>
											</select>
										</div>
										<div className="col-lg-6">
											<label htmlFor="trackingNumber" className="form-label">
												Tracking Number
											</label>
											<input
												id="trackingNumber"
												name="trackingNumber"
												defaultValue={
													acquisitionsdisposal?.data?.delivery.trackingNumber
												}
												type="text"
												className="form-control text-bg-dark mb-3"
												required
												placeholder="1234567890"
												disabled
											/>
											<small className="mb-3">
												Use&nbsp;
												<a
													href="https://www.ups.com/track?trackNums=&loc=en_US&requester=ST"
													className="btn btn-link btn-sm"
													target="_blank"
													rel="noreferrer noopener"
												>
													UPS
												</a>
												&nbsp;or&nbsp;
												<a
													href="https://www.fedex.com/en-us/tracking.html"
													className="btn btn-link btn-sm"
													target="_blank"
													rel="noreferrer noopener"
												>
													FedEx
												</a>
											</small>
										</div>
										<div className="col">
											<label htmlFor="text" className="form-label">
												NOTES:
											</label>
											<ParseHtml text={acquisitionsdisposal?.data?.text} />
											<hr />
											<div className="card rounded-0">
												{acquisitionsdisposal?.data?.files?.extras?.length >
												0 ? (
													<ul
														className="list-group list-group-flush"
														style={{
															maxHeight: "1000px",
														}}
													>
														{acquisitionsdisposal?.data?.files?.extras.map(
															(file, index) => (
																<li
																	key={index}
																	className={`list-group-item list-group-item-dark ${file?._id}`}
																>
																	<a
																		href={file?.location?.secure_location}
																		target="_blank"
																		rel="noreferrer noopener"
																	>
																		{file.location.filename}
																	</a>
																</li>
															),
														)}
													</ul>
												) : (
													<p>Nothing files found</p>
												)}
											</div>
										</div>
									</div>
								) : (
									<p>Not visible</p>
								)}
							</div>
						</div>
					</Suspense>
				</>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default NFATransferRead;
