"use client";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/app/store/loading";
import { useStoreCart } from "@/context/cartcontext";

const Single = ({ object = {}, auth = {} }) => {
	const { addItemToCart } = useStoreCart();

	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id} col-lg-4`}>
				<div
					className={`card border border-1 my-border-color bg-black text-bg-dark mb-3`}
				>
					<Link
						href={{
							pathname: `/store/${object?._id}/${object?.slug}`,
							query: {},
						}}
					>
						<Image
							className="card-img-top"
							src={
								object?.files?.avatar?.location?.secure_location ||
								`https://source.unsplash.com/random/483x363`
							}
							alt=""
							width={484}
							height={484}
							priority
						/>
					</Link>
					<div className="card-body">
						<div className="d-flex justify-content-between">
							<small className="text-secondary text-uppercase">
								{object?.category}
							</small>
							<small className="text-light text-decoration-underline text-uppercase">
								{object?.inStock ? "In Stock" : "Out of Stock"}
							</small>
						</div>
						<Link
							href={{
								pathname: `/store/${object?._id}/${object?.slug}`,
								query: {},
							}}
							className="fw-bold text-white mb-3"
						>
							{object?.title || "Untitled"}
						</Link>
						<p className="text-secondary">{object?.excerpt || "No excerpt"}</p>
						<p>
							<span className="fw-bold display-6">
								{object?.price.inHumanFormat}
							</span>
							&nbsp;
							<span className="text-secondary text-decoration-line-through">
								{object?.cost?.inHumanFormat}
							</span>
						</p>
						{auth?.data?.isOnline ? (
							<button
								className="btn btn-light btn-sm w-100"
								onClick={() => addItemToCart(object)}
							>
								<i aria-hidden className="fa-solid fa-cart-shopping me-2" />
								Add to cart
							</button>
						) : (
							<button className="btn btn-light btn-sm w-100">
								Login to Add to Cart
							</button>
						)}
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
