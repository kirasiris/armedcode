"use client";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NumericPagination = ({
	totalPages,
	searchParams = {},
	siblings,
	isAdmin = true,
}) => {
	const page = searchParams.page || 1;
	const limit = searchParams.limit || 10;
	const sort = searchParams.sort || "-createdAt";
	const keyword = searchParams.keyword;
	const decrypt = searchParams.decrypt || "";
	// Job query
	const experienceLevel = searchParams.experience_level;
	const jobType = searchParams.job_type;
	const remote = searchParams.remote;
	// Real state query
	const businessType = searchParams.businessType;
	const type = searchParams.type;
	const bedrooms = searchParams.bedrooms;
	const bathrooms = searchParams.bathrooms;
	// Store query
	const category = searchParams.category;
	const sub_category = searchParams.sub_category;

	// Initialize router
	const router = useRouter();

	// If query keyword is found
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	// If query experienceLevel is found
	const experienceLevelQuery =
		experienceLevel !== "" && experienceLevel !== undefined
			? `&experience_level=${experienceLevel}`
			: "";
	// If query jobType is found
	const jobTypeQuery =
		jobType !== "" && jobType !== undefined ? `&job_type=${jobType}` : "";
	// If query remote is found
	const remoteQuery =
		remote !== "" && remote !== undefined ? `&remote=${remote}` : "";
	// If businessType is found
	const businessTypeQuery =
		businessType !== "" && businessType !== undefined
			? `&businessType=${businessType}`
			: "";
	// If type is found
	const typeQuery = type !== "" && type !== undefined ? `&type=${type}` : "";
	// If bedrooms is found
	const bedroomsQuery =
		bedrooms !== "" && bedrooms !== undefined ? `&bedrooms=${bedrooms}` : "";
	// If bathrooms is found
	const bathroomsQuery =
		bathrooms !== "" && bathrooms !== undefined
			? `&bathrooms=${bathrooms}`
			: "";
	// If category is found
	const categoryQuery =
		category !== `` && category !== undefined ? `&category=${category}` : "";
	// sub_category is found
	const subCategoryQuery =
		sub_category !== `` && sub_category !== undefined
			? `&sub_category=${sub_category}`
			: "";
	// If query decrypt is found
	const decryptQuery = decrypt === "true" ? "&decrypt=true" : "";

	// Add them all together
	const newParams = `&sort=${sort}${keywordQuery}${experienceLevelQuery}${jobTypeQuery}${remoteQuery}${businessTypeQuery}${typeQuery}${bedroomsQuery}${bathroomsQuery}${categoryQuery}${subCategoryQuery}${decryptQuery}`;
	let pageNo;
	if (page <= Number(totalPages)) {
		pageNo = page;
	} else {
		pageNo = page;
	}

	const paginationRange = (siblings) => {
		let totalPagesNoInArray = 7 + Number(siblings);
		if (totalPagesNoInArray >= Number(totalPages)) {
			return _.range(1, Number(totalPages) + 1);
		}

		let leftSiblingsIndex = Math.max(pageNo - Number(siblings), 1);
		let rightSiblingsIndex = Math.min(
			pageNo + Number(siblings),
			Number(totalPages)
		);

		let showLeftDots = leftSiblingsIndex > 2;
		let showRightDots = rightSiblingsIndex < Number(totalPages) - 2;

		if (!showLeftDots && showRightDots) {
			let leftItemsCount = 3 + 2 * Number(siblings);
			let leftRange = _.range(1, leftItemsCount + 1);
			return [...leftRange, "...", Number(totalPages)];
		} else if (showLeftDots && !showRightDots) {
			let rightItemsCount = 3 + 2 * Number(siblings);
			let rightRange = _.range(
				Number(totalPages) - rightItemsCount + 1,
				Number(totalPages) + 1
			);
			return [1, "...", ...rightRange];
		} else {
			let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
			return [1, "...", ...middleRange, "...", Number(totalPages)];
		}
	};

	let array = paginationRange(siblings);

	const handlePageLimit = (value) => {
		router.push(`?page=${Number(pageNo)}&limit=${Number(value)}${newParams}`);
	};

	const selectLimit = () => {
		return (
			<select
				onChange={(e) => handlePageLimit(e.target.value)}
				className="form-select form-select-sm d-none d-md-block d-lg-block d-xl-block d-xxl-block p-2 text-bg-dark"
			>
				<option value={1}>1</option>
				<option value={3}>3</option>
				<option value={5}>5</option>
				<option value={10}>10</option>
				<option value={15}>15</option>
				<option value={20}>20</option>
				<option value={25}>25</option>
				<option value={50}>50</option>
				<option value={100}>100</option>
				<option value={250}>250</option>
				<option value={500}>500</option>
				<option value={750}>750</option>
				<option value={1000}>1000</option>
			</select>
		);
	};

	return (
		<div className="pagination-container d-flex align-items-center justify-content-end">
			{isAdmin && selectLimit()}
			<ul className="pagination justify-content-end m-0 my-1 mx-1">
				<li className={`page-item ${Number(pageNo) - 1 === 0 && `disabled`}`}>
					<Link
						href={`?page=1&limit=${Number(limit)}${newParams}`}
						scroll={false}
						className="page-link text-bg-dark"
					>
						&laquo;&nbsp;First
					</Link>
				</li>
				{/* Previous page link */}
				<li className={`page-item ${Number(pageNo) - 1 === 0 && `disabled`}`}>
					<Link
						href={`?page=${Number(pageNo) - 1}&limit=${Number(
							limit
						)}${newParams}`}
						scroll={false}
						className="page-link text-bg-dark"
					>
						&lsaquo;&nbsp;
					</Link>
				</li>
				{array.map((index) => {
					return (
						<li
							key={index}
							className={`page-item${
								Number(index) === Number(pageNo)
									? " active text-decoration-underline"
									: ""
							} d-none d-md-block d-lg-block d-xl-block d-xxl-block`}
						>
							{index === "&laquo;" ? (
								<Link
									href={`?page=1&limit=${Number(limit)}${newParams}`}
									scroll={false}
									className={`bg-black text-bg-dark page-link${
										index === "..." ? " disabled" : ""
									}`}
								>
									{index}
								</Link>
							) : index === "&lsaquo;" ? (
								pageNo !== 1 && (
									<Link
										href={`?page=${Number(pageNo) - 1}&limit=${Number(
											limit
										)}${newParams}`}
										scroll={false}
										className={`text-bg-dark page-link${
											index === "..." ? " disabled" : ""
										}`}
									>
										{index}
									</Link>
								)
							) : index === "&rsaquo;" ? (
								pageNo !== totalPages && (
									<Link
										href={`?page=${Number(pageNo) + 1}&limit=${Number(
											limit
										)}${newParams}`}
										scroll={false}
										className={`text-bg-dark page-link${
											index === "..." ? " disabled" : ""
										}`}
									>
										{index}
									</Link>
								)
							) : index === "&raquo;" ? (
								<Link
									href={`?page=${Number(totalPages)}&limit=${Number(
										limit
									)}${newParams}`}
									scroll={false}
									className={`text-bg-dark page-link${
										index === "..." ? " disabled" : ""
									}`}
								>
									{index}
								</Link>
							) : (
								<Link
									href={`?page=${index}&limit=${Number(limit)}${newParams}`}
									scroll={false}
									className={`text-bg-dark page-link${
										index === "..." ? " disabled" : ""
									}`}
								>
									{index}
								</Link>
							)}
						</li>
					);
				})}
				{/* Next page link */}
				<li
					className={`page-item ${
						Number(pageNo) === Number(totalPages) && "disabled"
					}`}
				>
					<Link
						href={`?page=${Number(pageNo) + 1}&limit=${Number(
							limit
						)}${newParams}`}
						scroll={false}
						className="page-link text-bg-dark"
					>
						&rsaquo;&nbsp;
					</Link>
				</li>
				<li
					className={`page-item ${
						Number(pageNo) === Number(totalPages) && "disabled"
					}`}
				>
					<Link
						href={`?page=${Number(totalPages)}&limit=${Number(
							limit
						)}${newParams}`}
						scroll={false}
						className="page-link text-bg-dark"
					>
						&raquo;&nbsp;Last
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default NumericPagination;
