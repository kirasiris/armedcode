"use client";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import Loading from "@/app/store/loading";

const Single = ({ object = {} }) => {
	const addToWishlist = async () => {
		toast.success(`Added to wishlist`);
	};

	const addToCart = async () => {
		toast.success(`Added to cart`);
	};

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
						<p className="text-secondary text-capitalize mb-0">
							{object?.category}
						</p>
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
						<button className="btn btn-secondary btn-sm w-100">
							<i aria-hidden className="fa-solid fa-cart-shopping me-2" />
							Add to cart
						</button>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
