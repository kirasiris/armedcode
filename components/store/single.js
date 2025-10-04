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
					<div className="card-header">
						<Link
							href={`/store/${object?._id}/${object?.slug}`}
							className="text-white"
						>
							{object?.title || "Untitled"}
						</Link>
					</div>
					<div>
						<Image
							className="card-img-top"
							src={object?.files?.avatar?.location?.secure_location}
							alt=""
							width="400"
							height="200"
						/>
						<button
							type="button"
							className="btn btn-danger btn-sm"
							style={{
								position: "absolute",
								right: "10px",
								top: "50px",
							}}
							onClick={addToWishlist}
						>
							<i aria-hidden className="fa-regular fa-heart" />
							<i aria-hidden className="fa-solid fa-heart" />
						</button>
					</div>
					<div className="card-body">
						<p>{object?.category}</p>
					</div>
					<div className="card-footer d-flex justify-content-between">
						<button type="button" className="btn btn-sm" onClick={addToCart}>
							<i aria-hidden className="fa-solid fa-cart-shopping text-white" />
							<i
								aria-hidden
								className="fa-solid fa-cart-shopping text-danger"
							/>
						</button>
						<button className="btn btn-success btn-sm">
							Price:{object?.price.inHumanFormat}
						</button>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
