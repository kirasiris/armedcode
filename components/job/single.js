"use client";
import { Suspense } from "react";
import Link from "next/link";
import { formatDateWithoutTime } from "befree-utilities";
import Loading from "@/app/blog/loading";

const Single = ({ object = {} }) => {
	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id}`}>
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
					<div className="card-header d-flex justify-content-between">
						<div>
							<Link
								href={`/job/${object?._id}/${object?.slug}`}
								className="text-white"
							>
								<p className="fw-bold mb-0">{object.title}</p>
							</Link>
							<small className="text-secondary">
								<i aria-hidden className="fa-regular fa-calendar me-1" />
								{formatDateWithoutTime(object?.createdAt)}
							</small>
						</div>
					</div>
					<div className="card-body">
						<Link
							href={`/job/${object?._id}/${object?.slug}`}
							className="btn btn-sm btn-light w-100"
						>
							Read&nbsp;more
						</Link>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
