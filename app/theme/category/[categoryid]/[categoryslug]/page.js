import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/theme/list";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getThemes(params) {
	const res = await fetchurl(
		`/global/themes${params}&postType=theme&status=published`,
		"GET",
		"no-cache",
	);
	return res;
}

async function getCategories(params) {
	const res = await fetchurl(`/global/categories${params}`, "GET", "no-cache");
	return res;
}

const ThemeCategoryIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getFeaturedThemesData = getThemes(`?featured=true${decrypt}`);

	const getThemesData = getThemes(
		`?page=${page}&limit=${limit}&sort=${sort}&category=${awtdParams.categoryid}${decrypt}`,
	);

	const getCategoriesData = getCategories(`?categoryType=theme`);

	const [featured, themes, categories] = await Promise.all([
		getFeaturedThemesData,
		getThemesData,
		getCategoriesData,
	]);

	const capitalizeWord = awtdParams.categoryslug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return (
		<>
			<Head
				title={`${settings?.data?.title} - ${capitalizeWord}`}
				description={`${capitalizeWord} search results`}
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/theme/category/${awtdParams.categoryid}/${awtdParams.categoryslug}?page=${page}&limit=${limit}&sort=${sort}`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<List
					featured={featured}
					objects={themes}
					searchParams={awtdSearchParams}
					categories={categories}
				/>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default ThemeCategoryIndex;
