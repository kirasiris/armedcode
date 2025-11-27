"use client";
import { Suspense } from "react";
import Link from "next/link";
import { stripeCurrencyFormatter } from "befree-utilities";
import Loading from "@/app/blog/loading";
import { useStoreCart } from "@/context/cartcontext";

const Single = ({ object = {} }) => {
	const {
		getItemQuantity,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		getTotalItemCost,
	} = useStoreCart();

	const itemQuantity = getItemQuantity(object);

	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id}`}>
				<li className="list-group-item d-flex gap-3 my-border-color bg-black text-bg-dark rounded-1 mb-3">
					<img src={object?.avatar} width={96} height={96} />
					<div className="d-flex gap-2 w-100 justify-content-between">
						<div>
							<Link
								href={{
									pathname: `/store/${object?._id}/${object?.slug}`,
									query: {},
								}}
							>
								<h6 className="text-secondary mb-2">{object?.title}</h6>
							</Link>
							<h5 className="mb-2">{stripeCurrencyFormatter(object?.price)}</h5>
							<div className="btn-group me-2">
								<button
									className="btn btn-light btn-sm"
									onClick={() => {
										removeItemFromCart(object);
									}}
								>
									<i aria-hidden className="fa-solid fa-minus" />
								</button>
								<button className="btn btn-secondary btn-sm">
									{itemQuantity}
								</button>
								<button
									className="btn btn-light btn-sm"
									onClick={() => {
										addItemToCart(object);
									}}
								>
									<i aria-hidden className="fa-solid fa-plus" />
								</button>
							</div>
							<button
								className="btn btn-danger btn-sm"
								onClick={() => {
									clearItemFromCart(object);
								}}
							>
								<i aria-hidden className="fa-solid fa-trash-can" />
							</button>
						</div>
						<h5 className="text-nowrap">
							{stripeCurrencyFormatter(getTotalItemCost(object))}
						</h5>
					</div>
				</li>
			</article>
		</Suspense>
	);
};

export default Single;
