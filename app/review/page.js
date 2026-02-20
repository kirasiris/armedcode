import {
	fetchurl,
	getAuthTokenOnServer,
	getUserOnServer,
} from "@/helpers/fetchurl";
import List from "@/components/review/list";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getReviews(params) {
	const res = await fetchurl(
		`/global/comments${params}&postType=review&status=published&decrypt=true`,
		"GET",
		"no-cache",
	);
	return res;
}

const ReviewIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const rating =
		awtdSearchParams.rating !== undefined
			? `&rating=${awtdSearchParams.rating}`
			: "";

	const auth = await getUserOnServer();
	const token = await getAuthTokenOnServer();

	const { settings } = await getGlobalData();

	const getReviewsData = getReviews(
		`?page=${page}&limit=${limit}&sort=${sort}${rating}`,
	);

	const [reviews] = await Promise.all([getReviewsData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Reviews`}
				description="Check my customer reviews"
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/review`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<List
					auth={auth}
					token={token}
					objects={reviews}
					searchParams={awtdSearchParams}
					returtopageurl="/review"
				/>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default ReviewIndex;
