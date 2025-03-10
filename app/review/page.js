import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/review/list";
import NotVisiblePage from "@/layout/notvisiblepage";

async function getReviews(params) {
	const res = await fetchurl(`/comments${params}`, "GET", "no-cache");
	return res;
}

const ReviewIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const postType = awtdSearchParams.postType || "review";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getReviewsData = getReviews(
		`?page=${page}&limit=${limit}&sort=${sort}&postType=${postType}&status=published${decrypt}`
	);

	const [reviews] = await Promise.all([getReviewsData]);

	return (
		<List
			objects={reviews}
			searchParams={awtdSearchParams}
			returtopageurl="/reviews"
		/>
	);
};

export default ReviewIndex;
