"use client";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";
import { stripeCurrencyFormatter } from "befree-utilities";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Single from "./single";
import Globalcontent from "@/layout/content";
import Globalsidebar from "@/layout/sidebar";
import { useStoreCart } from "@/context/cartcontext";
import { fetchurl } from "@/helpers/fetchurl";

const List = ({ objects = [] }) => {
	const router = useRouter();

	const {
		items,
		loading,
		clearCart,
		getItemFee,
		getCartSubtotal,
		getTotalCartCost,
	} = useStoreCart();

	const [saveBtnText, setSaveBtnText] = useState("Save Cart");
	const [clearBtnText, setClearBtnText] = useState("Clear Cart");

	const saveCart = async (objects = []) => {
		setSaveBtnText("Saving Cart...");
		const rawFormData = {
			items: objects,
		};
		const res = await fetchurl(
			`/protected/stripe/carts`,
			"POST",
			"no-cache",
			rawFormData,
		);
		if (res.status === "error") {
			toast.error(res.message);
			setSaveBtnText("Save Cart");
			return;
		}
		if (res.status === "fail") {
			toast.error(res.message);
			setSaveBtnText("Save Cart");
			return;
		}
		setSaveBtnText("Save Cart");
		toast.success("Cart saved");
		router.push(`/cart/${res?.data?._id}`);
	};

	const handleClearCart = async (objectId) => {
		setClearBtnText("Clearing Out Cart...");
		await fetchurl(
			`/protected/stripe/carts/${objectId}/permanently`,
			"DELETE",
			"no-cache",
		);
		clearCart();
	};

	return (
		<section className="bg-black py-5 text-bg-dark">
			<div className="container">
				<div className="row">
					<Globalcontent classList="col-lg-8">
						{loading ? (
							<div className="border border-1 my-border-color rounded-1 d-flex justify-content-center align-items-center h-100">
								<Spinner />
							</div>
						) : items?.length > 0 ? (
							<>
								<ul className="list-group">
									{items?.map((item, index) => (
										<Single key={index} object={item} />
									))}
								</ul>
							</>
						) : (
							<div className="border border-1 my-border-color rounded-1 d-flex justify-content-center align-items-center h-100">
								<div className="text-center">
									<i aria-hidden className="fa-solid fa-cart-shopping fa-5x" />
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
										<span>
											{loading
												? "Loading..."
												: stripeCurrencyFormatter(getCartSubtotal())}
										</span>
									</li>
									<li className="d-flex justify-content-between border-bottom my-border-color py-2">
										<span className="text-secondary">Fee</span>
										<span>
											{loading
												? "Loading..."
												: stripeCurrencyFormatter(getItemFee())}
										</span>
									</li>
									<li className="d-flex justify-content-between border-bottom my-border-color py-2">
										<span className="text-secondary">Shipping</span>
										<span>calculated at checkout</span>
									</li>
									<li className="d-flex justify-content-between border-bottom my-border-color py-2">
										<h4>Total</h4>
										<h4>
											{loading
												? "Loading..."
												: stripeCurrencyFormatter(getTotalCartCost())}
										</h4>
									</li>
								</ul>
								<Link
									href={{
										pathname: `/store`,
										query: {},
									}}
									className="btn btn-secondary btn-sm w-100 text-uppercase mb-3"
								>
									Continue Shopping
								</Link>
								{items?.length > 0 && (
									<button
										type="button"
										className="btn btn-secondary btn-sm w-100 text-uppercase mb-3"
										onClick={() => saveCart(items)}
									>
										{saveBtnText}
									</button>
								)}
								{objects?.data?.[0].length > 0 ||
									(items?.length > 0 && (
										<button
											className="btn btn-danger btn-sm w-100 text-uppercase"
											onClick={() => {
												handleClearCart(objects?.data?.[0]?._id);
											}}
										>
											{clearBtnText}
										</button>
									))}
							</div>
						</div>
					</Globalsidebar>
				</div>
			</div>
		</section>
	);
};

export default List;
