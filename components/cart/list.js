"use client";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";
import { stripeCurrencyFormatter } from "befree-utilities";
import Single from "./single";
import Globalcontent from "@/layout/content";
import Globalsidebar from "@/layout/sidebar";
import { useStoreCart } from "@/context/cartcontext";
import ErrorPage from "@/layout/errorpage";

const List = ({
	objects = [],
	searchedKeyword = "",
	searchParams = {},
	handleSaveCart = () => {},
	handleItemQuantity = () => {},
}) => {
	const { items, loading, clearCart, getItemFee, getTotalCartCost } =
		useStoreCart();

	if (
		typeof handleSaveCart !== "function" &&
		handleSaveCart !== "" &&
		handleSaveCart !== undefined &&
		handleSaveCart !== null
	) {
		return (
			<ErrorPage
				statusCodeMessage={
					"The handleSaveCart parameter is not a function!. Please try again"
				}
			/>
		);
	}

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
							<ul className="list-group">
								{items?.map((item, index) => (
									<Single
										key={index}
										object={item}
										handleItemQuantity={handleItemQuantity}
									/>
								))}
							</ul>
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
												: stripeCurrencyFormatter(getTotalCartCost())}
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
												: stripeCurrencyFormatter(
														getItemFee() + getTotalCartCost()
												  )}
										</h4>
									</li>
								</ul>
								{objects?.data?.length > 0 && items?.length > 0 && (
									<button className="btn btn-light btn-sm w-100 text-uppercase mb-3">
										Proceed to Checkout
									</button>
								)}
								<Link
									href={{
										pathname: `/store`,
										qeury: {},
									}}
									className="btn btn-secondary btn-sm w-100 text-uppercase mb-3"
								>
									Continue Shopping
								</Link>
								{items?.length > 0 && (
									<button
										type="button"
										className="btn btn-secondary btn-sm w-100 text-uppercase mb-3"
										onClick={async () => await handleSaveCart(items)}
									>
										Save Cart
									</button>
								)}
								{objects?.data?.length > 0 && items?.length > 0 && (
									<button
										className="btn btn-danger btn-sm w-100 text-uppercase"
										onClick={() => clearCart()}
									>
										Clear Cart
									</button>
								)}
							</div>
						</div>
					</Globalsidebar>
				</div>
			</div>
		</section>
	);
};

export default List;
