import { Suspense } from "react";
import { notFound } from "next/navigation";
import Loading from "@/app/store/loading";
import ParseHtml from "@/layout/parseHtml";
import { fetchurl } from "@/helpers/fetchurl";
import Globalcontent from "@/layout/content";
import Head from "@/app/head";
import Globalsidebar from "@/layout/sidebar";
import Image from "next/image";

async function getProduct(params) {
	const res = await fetchurl(`/global/products${params}`, "GET", "no-cache");
	if (!res.success) notFound();
	return res;
}

const StoreRead = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const product = await getProduct(`/${awtdParams.id}`);

	// Draft It

	// Publish It

	// Trash It

	// Schedule It

	// Handle Trash All

	// Handle Delete All

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={product.data.title}
				description={product.data.excerpt || product.data.text}
				// favicon=""
				postImage={product.data.files.avatar.location.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category={product.data.type}
				url={`/store/${product.data._id}/${product.data.slug}`}
				author={product.data.user.name}
				createdAt={product.data.createdAt}
				updatedAt={product.data.updatedAt}
				locales=""
				posType="blog"
			/>
			<div className="bg-black py-5 text-bg-dark">
				<div className="container">
					{product.data.status === "published" ||
					awtdSearchParams.isAdmin === "true" ? (
						<div className="row">
							<Globalcontent classList={`col-lg-6`}>
								<Image
									className="img-fluid"
									src={
										product?.data?.files?.avatar?.location?.secure_location ||
										`https://source.unsplash.com/random/483x363`
									}
									alt=""
									width={727}
									height={727}
									priority
								/>
							</Globalcontent>
							<Globalcontent classList={`col-lg-6`}>
								<div className="d-flex justify-content-between">
									<small className="text-secondary text-uppercase">
										{product?.data?.category}
									</small>
									<small className="text-light text-decoration-underline text-uppercase">
										{product?.data?.inStock ? "In Stock" : "Out of Stock"}
									</small>
								</div>
								<h1>{product?.data?.title}</h1>
								<p className="text-secondary">{product?.data?.excerpt}</p>
								<p>
									<span className="fw-bold display-4 me-1">
										{product?.data?.price?.inHumanFormat}
									</span>
									<span className="fw-bold display-6 text-secondary text-decoration-line-through">
										{product?.data?.comparePrice?.inHumanFormat}
									</span>
								</p>
								<p>
									<span className="me-2">
										{product?.data?.stockQuantity} in stock
									</span>
									<span className="text-secondary">
										SKU: {product?.data?.sku}
									</span>
								</p>
								<button className="btn btn-light btn-sm w-100 mb-4">
									<i aria-hidden className="fa-solid fa-cart-shopping me-2" />
									ADD TO CART
								</button>
								<h2>Specifications</h2>
								{product?.data?.category === "weapons" && (
									<ul>
										<li>{product.data.caliber}</li>
										<li>Caliber</li>
									</ul>
								)}
							</Globalcontent>
						</div>
					) : (
						<p>Not visible</p>
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default StoreRead;
