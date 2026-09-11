import { Suspense } from "react";
import { redirect } from "next/navigation";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Loading from "@/app/blog/loading";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import ErrorPage from "@/layout/errorpage";
import AddAddressForm from "@/forms/cart/addaddressform";
import Globalsidebar from "@/layout/sidebar";

async function getCarts(params) {
	const res = await fetchurl(`/global/carts${params}`, "GET", "no-cache");
	return res;
}

const CreateAddress = async ({ params, searchParams }) => {
	const awtdParams = await params;

	const { auth, settings } = await getGlobalData();

	// Redirect if user is not logged in
	(auth?.error?.statusCode === 401 || !auth?.data?.isOnline) &&
		redirect(`/auth/login`);

	const cart = await getCarts(`/${awtdParams.id}`);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Cart Addresses`}
				description={"Manage your addresses"}
				favicon={settings?.data?.favicon?.location?.secure_location}
				postImage={settings.data.showcase_image?.location?.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/cart/${cart?.data?._id}/addresses/create`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<Suspense fallback={<Loading />}>
					<section className="bg-black py-5 text-bg-dark">
						<div className="container">
							<div className="row">
								<Globalcontent classList="col-lg-8">
									<AddAddressForm objectId={cart?.data?._id} />
								</Globalcontent>
								<Globalsidebar>
									<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
										<div className="card-body">
											<h3 className="mb-4">Order&nbsp;Summary</h3>
											<ul className="list-unstyled">
												<li className="d-flex justify-content-between border-bottom my-border-color py-2">
													<span className="text-secondary">Subtotal</span>
													<span>{cart?.data?.subtotal.inHumanFormat}</span>
												</li>
												<li className="d-flex justify-content-between border-bottom my-border-color py-2">
													<span className="text-secondary">Fee</span>
													<span>{cart?.data?.fee.inHumanFormat}</span>
												</li>
												<li className="d-flex justify-content-between border-bottom my-border-color py-2">
													<span className="text-secondary">Shipping</span>
													<span>calculated at checkout</span>
												</li>
												<li className="d-flex justify-content-between border-bottom my-border-color py-2">
													<h4>Total</h4>
													<h4>{cart?.data?.total.inHumanFormat}</h4>
												</li>
											</ul>
										</div>
									</div>
								</Globalsidebar>
							</div>
						</div>
					</section>
				</Suspense>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default CreateAddress;
