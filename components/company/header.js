"use client";

import Image from "next/image";
import ParseHtml from "../../layout/parseHtml";

const CompanyHeader = ({ object = {} }) => {
	return (
		<header className="bg-dark text-bg-dark py-5">
			<div className="container py-5">
				<div className="row">
					<div className="col-auto">
						<figure>
							<Image
								src={
									object?.files?.avatar?.location?.secure_location ||
									`https://source.unsplash.com/random/260x370`
								}
								alt={`${object?.files?.avatar?.location?.filename}'s featured image`}
								width={100}
								height={100}
								priority
							/>
						</figure>
					</div>
					<div className="col">
						<h1 className="display-1 text-uppercase">{object?.title}</h1>
						<ParseHtml
							text={object?.text}
							classList="display-6 text-uppercase"
						/>
						<a
							href={`mailto:${object?.email}`}
							className="btn btn-light btn-sm me-1"
						>
							<i aria-hidden className="fa-solid fa-envelope me-1" />
							{object?.email}
						</a>
						<a
							href={`tel:${object?.phoneNumber}`}
							className="btn btn-light btn-sm me-1"
						>
							<i aria-hidden className="fa-solid fa-phone me-1" />
							{object?.phoneNumber}
						</a>
						<a
							href={object?.website}
							className="btn btn-light btn-sm"
							target="_blank"
							rel="noreferrer noopener"
						>
							<i aria-hidden className="fa-solid fa-globe me-1" />
							Visit website
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default CompanyHeader;
