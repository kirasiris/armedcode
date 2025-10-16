"use client";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/app/realstate/loading";

const Single = ({ object = {} }) => {
	return (
		<Suspense fallback={<Loading />}>
			<article className={`col-lg-4 ${object?._id}`}>
				<div
					className={`card border border-1 my-border-color bg-black text-bg-dark mb-3`}
				>
					<Link
						href={{
							pathname: `/realstate/${object?._id}/${object?.slug}`,
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
							width={483}
							height={363}
							priority
						/>
					</Link>
					<div className="card-body">
						<Link
							href={{
								pathname: `/realstate/${object?._id}/${object?.slug}`,
								query: {},
							}}
							className="text-white"
						>
							{object?.title || "Untitled"}
						</Link>
						<div className="d-flex align-items-baseline">
							<i aria-hidden className="fa-solid fa-location-dot me-2" />
							<span className="text-secondary">
								{object?.location?.city},&nbsp;{object?.location?.state}
							</span>
						</div>
						<p>
							{object?.businessType === "sale" && (
								<>
									<span className="fw-bold display-6">
										{object?.price?.inHumanFormat}
									</span>
								</>
							)}
							{object?.businessType === "rent" && (
								<>
									<span className="fw-bold display-6">
										{object?.rates?.monthlyPrice?.inHumanFormat}
									</span>
									/<span className="text-secondary">month</span>
								</>
							)}
						</p>
						<div className="row">
							<div className="col text-center">
								<p className="mb-0">
									<i aria-hidden className="fa-solid fa-bed me-1 text-white" />
									<span className="text-secondary">
										{object?.bedrooms}&nbsp;bedrooms
									</span>
								</p>
							</div>
							<div className="col text-center">
								<p className="mb-0">
									<i aria-hidden className="fa-solid fa-bath me-1 text-white" />
									<span className="text-secondary">
										{object?.bathrooms}&nbsp;bathrooms
									</span>
								</p>
							</div>
							<div className="col text-center">
								<p className="mb-0">
									<i aria-hidden className="fa-solid fa-bath me-1 text-white" />
									<span className="text-secondary">
										{object?.squarefeet}&nbsp;sqft
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
