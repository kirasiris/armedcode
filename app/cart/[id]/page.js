import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/cart/dblist";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import Globalcontent from "@/layout/content";
import Globalsidebar from "@/layout/sidebar";
import ApplyCouponForm from "@/forms/cart/applycouponform";
import AddressesList from "@/components/cart/addresseslist";

async function getCarts(params) {
	const res = await fetchurl(`/global/carts${params}`, "GET", "no-cache");
	return res;
}

async function getAddresses(params) {
	const res = await fetchurl(`/global/addresses${params}`, "GET", "no-cache");
	return res;
}

const CartRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const { auth, settings } = await getGlobalData();

	// Redirect if user is not logged in
	(auth?.error?.statusCode === 401 || !auth?.data?.isOnline) &&
		redirect(`/auth/login`);

	const cart = await getCarts(`/${awtdParams.id}`);
	const addresses = await getAddresses(`?user=${auth?.data?._id}`);

	const checkout = async (cartId = 0, objects = []) => {
		"use server";
		await fetchurl(
			`/protected/stripe/carts/checkout/${cartId}`,
			"POST",
			"no-cache",
			{
				items: objects,
			},
		);
	};

	const removeItemFromCart = async (cartId = 0, itemId = 0) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/carts/${cartId}/items/${itemId}`,
			"DELETE",
			"no-cache",
		);
		revalidatePath(`/cart/${cartId}`);
	};

	const removeAddress = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/addresses/${id}/permanently`,
			"DELETE",
			"no-cache",
			{},
			undefined,
			false,
			false,
		);
		revalidatePath(`/cart/${id}`);
	};

	const setPrimaryAddress = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/addresses/${id}/primary`,
			"PUT",
			"no-cache",
			{},
			undefined,
			false,
			false,
		);
		revalidatePath(`/cart/${id}`);
	};

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Cart`}
				description="Check your items before checkout!"
				favicon={settings?.data?.favicon?.location?.secure_location}
				postImage={settings.data.showcase_image?.location?.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/cart`}
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
							<Globalcontent classList="col-lg-8">
								{cart?.data?.items?.length > 0 ? (
									<>
										<List
											objectId={cart?.data?._id}
											objects={cart?.data?.items}
											handleRemoveItemFromCart={removeItemFromCart}
										/>
										<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
											<div className="card-header">
												<div className="float-start">
													<div className="d-flex align-items-center my-2">
														Manage&nbsp;Addresses
													</div>
												</div>
												<div className="float-end my-1">
													<div className="btn-group">
														<Link
															href={{
																pathname: `/cart/${cart?.data?._id}/addresses/create`,
																query: {},
															}}
															className="btn btn-primary btn-sm"
														>
															Add&nbsp;Address
														</Link>
													</div>
												</div>
											</div>
											<div className="card-body">
												<label htmlFor="address" className="form-label">
													Primary&nbsp;Address
												</label>
												<input
													id="address"
													name="address"
													defaultValue={
														addresses?.data?.filter(
															(address) => address.isPrimary === true,
														)[0].address
													}
													type="text"
													className="form-control text-bg-dark mb-3"
													disabled
													placeholder="John Doe"
												/>
												<AddressesList
													objects={addresses?.data}
													handleIsPrimary={setPrimaryAddress}
													handleRemoveAddress={removeAddress}
												/>
											</div>
										</div>
									</>
								) : (
									<div className="border border-1 my-border-color rounded-1 d-flex justify-content-center align-items-center h-100">
										<div className="text-center">
											<i
												aria-hidden
												className="fa-solid fa-cart-shopping fa-5x"
											/>
											<p>Your cart is empty</p>
										</div>
									</div>
								)}
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
										<ApplyCouponForm objectId={cart?.data?._id} />
									</div>
								</div>
								<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
									<div className="card-body">
										<button className="btn btn-light btn-sm w-100 text-uppercase mb-3">
											Proceed to Checkout
										</button>
										<Link
											href={{
												pathname: `/store`,
												query: {},
											}}
											className="btn btn-secondary btn-sm w-100 text-uppercase mb-3"
										>
											Continue Shopping
										</Link>
									</div>
								</div>
							</Globalsidebar>
						</div>
					</div>
				</section>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default CartRead;
