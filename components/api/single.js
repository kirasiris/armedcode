import ParseHtml from "@/layout/parseHtml";
import Link from "next/link";
import React, { Suspense } from "react";

const Single = ({ object = {} }) => {
	return (
		<Suspense>
			<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
				<div className="card-header d-flex justify-content-between align-items-center">
					<div>
						<p className="mb-0">{object.title}</p>
						<small className="text-secondary">
							{object.type} | {object.caliber} | SN: {object.serialNumber}
						</small>
					</div>
					<p className="mb-0">
						{/* <Link
							href={{
								pathname: `/api/read/${object._id}`,
								query: {},
							}}
						>
							<span className="badge rounded-pill text-bg-light me-2">
								View
							</span>
						</Link> */}
						<span className="badge rounded-pill text-bg-light me-2">View</span>
					</p>
				</div>
				<div className="card-body">
					<ParseHtml text={object.text} parseAs="p" />
				</div>
			</div>
		</Suspense>
	);
};

export default Single;
