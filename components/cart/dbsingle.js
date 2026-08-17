"use client";
import { Suspense } from "react";
import Link from "next/link";
import { stripeCurrencyFormatter } from "befree-utilities";
import Loading from "@/app/blog/loading";
import DeleteModal from "@/components/global/deletemodal";

const Single = ({
	cartId = 0,
	object = {},
	handleRemoveItemFromCart = () => {},
	objects = [],
	setObjects = () => {},
	setTotalResults = () => {},
}) => {
	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id}`}>
				<li className="list-group-item d-flex gap-3 my-border-color bg-black text-bg-dark rounded-1 mb-3">
					<img
						src={object?.resourceId?.files?.avatar?.location?.secure_location}
						width={96}
						height={96}
					/>
					<div className="d-flex gap-2 w-100 justify-content-between">
						<div>
							<Link
								href={{
									pathname: `/store/${object?.resourceId?._id}/${object?.resourceId?.slug}`,
									query: {},
								}}
							>
								<h6 className="text-secondary mb-2">
									{object?.resourceId?.title}
								</h6>
							</Link>
							<h5 className="mb-2">{object?.price?.default_price}</h5>
							<div className="btn-group me-2">
								<button className="btn btn-secondary btn-sm">
									Quantity: {object?.quantity}
								</button>
							</div>
							<DeleteModal
								id={cartId}
								sId={object?._id}
								classStr="btn btn-danger btn-sm"
								action={handleRemoveItemFromCart}
								setObjects={setObjects}
								objects={objects}
								setTotalResults={setTotalResults}
								displayText={false}
							/>
						</div>
						<h5 className="text-nowrap">
							{stripeCurrencyFormatter(Number(object?.price?.inCentsFormat))}
						</h5>
					</div>
				</li>
			</article>
		</Suspense>
	);
};

export default Single;
