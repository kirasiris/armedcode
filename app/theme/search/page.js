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

const ThemeSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getFeaturedThemesData = getThemes(`?featured=true${decrypt}`);

	const getThemesData = getThemes(
		`?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${decrypt}`,
	);

	const getCategoriesData = getCategories(`?categoryType=theme`);

	const [featured, themes, categories] = await Promise.all([
		getFeaturedThemesData,
		getThemesData,
		getCategoriesData,
	]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Search results of ${awtdSearchParams.keyword}`}
				description={"Search results..."}
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/theme/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`}
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

export default ThemeSearchIndex;
