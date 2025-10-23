"use client";
import { Suspense } from "react";
import Link from "next/link";
import { formatDateWithoutTime } from "befree-utilities";
import Loading from "@/app/blog/loading";

const Single = ({ object = {} }) => {
	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id} col-lg-4`}>
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<Link href={`/job/${object?._id}/${object?.slug}`}>
						<div className="card-header d-flex justify-content-between">
							<p className="text-white fw-bold mb-0">{object.title}</p>

							<small className="text-secondary">
								<i aria-hidden className="fa-regular fa-calendar me-1" />
								{formatDateWithoutTime(object?.createdAt)}
							</small>
						</div>
						<div className="card-body">
							<p className="text-secondary">
								<i
									aria-hidden="true"
									className="fa-solid fa-location-dot me-1"
								/>
								{object?.location.city}, {object?.location.state}
							</p>
							<p className="text-secondary">{object?.excerpt}</p>
							<p>
								<span className="badge border text-secondary text-capitalize me-1">
									{object?.experience_level.map((el) =>
										el.split("-").join(" ")
									)}
								</span>
								<span className="badge border text-secondary text-capitalize me-1">
									{object?.job_type.map((jt) => jt.split("-").join(" "))}
								</span>
								<span className="badge border text-secondary text-capitalize">
									{object?.remote.map((r) => r.split("-").join(" "))}
								</span>
							</p>
							<p className="text-secondary mb-0">
								<i
									aria-hidden="true"
									className="fa-solid fa-dollar-sign me-1"
								/>
								Starting at {object?.starting_at}/hr
							</p>
							{object?.security_clearance && (
								<p className="text-secondary mb-0">
									<i
										aria-hidden="true"
										className="fa-solid fa-user-secret me-1"
									/>
									Security Clearance Required
								</p>
							)}
						</div>
					</Link>
				</div>
			</article>
		</Suspense>
	);
};

export default Single;
