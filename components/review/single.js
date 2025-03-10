"use client";

import Image from "next/image";
import { Suspense } from "react";

const Loading = () => {
	return <>Loading reviews...</>;
};

const Single = ({
	object = {},
	fullWidth = false,
	imageWidth = "415",
	imageHeight = "207",
}) => {
	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object._id}`}>
				<div className="card bg-black text-bg-dark mb-3">
					<div className="card-header d-flex justify-content-between align-items-center">
						<a>Excellent NFA Transfer Service</a>
						<button className="btn btn-light btn-sm">Stars</button>
					</div>
					<div className="card-body">
						<small>about 1 year ago by John D.</small>
						<p>
							The process was smooth and much faster than I expected. The team
							was professional and kept me updated throughout the process.
							Highly recommended for anyone looking for NFA transfer services.
						</p>
						<Image
							alt="Placeholder image"
							src={`https://kzmjk7r94butx83hi0jq.lite.vusercontent.net/placeholder.svg?height=400&width=600`}
							className="rounded"
							width={600}
							height={400}
							style={{ maxHeight: "300px", objectFit: "contain" }}
						/>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
