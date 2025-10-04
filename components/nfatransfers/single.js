"use client";
import { Suspense } from "react";
import Link from "next/link";
import { formatDateWithoutTime } from "befree-utilities";
import Loading from "@/app/blog/loading";

const Single = ({ object = {} }) => {
	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id}`}>
				<div
					className={`card border border-1 my-border-color bg-black text-bg-dark mb-3`}
				>
					<div className="card-header">
						<Link href={`/nfatransfers/${object?._id}`}>
							{object?.manufacturer || "Untitled"}&nbsp;|&nbsp;{object?.title}
							&nbsp;|&nbsp;{object?.caliber}
						</Link>
					</div>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
