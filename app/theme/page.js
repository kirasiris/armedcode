import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/theme/list";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/settings/${params}`, "GET", "default");
	return res;
}

async function getFeaturedTheme(params) {
	const res = await fetchurl(`/themes${params}`, "GET", "no-cache");
	return res;
}

async function getThemes(params) {
	const res = await fetchurl(`/themes${params}`, "GET", "no-cache");
	return res;
}

async function getCategories(params) {
	const res = await fetchurl(`/categories${params}`, "GET", "no-cache");
	return res;
}

const ThemeIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getFeaturedThemesData = getFeaturedTheme(
		`?featured=true&postType=theme&status=published${decrypt}`
	);

	const getThemesData = getThemes(
		`?page=${page}&limit=${limit}&sort=${sort}&postType=theme&status=published${decrypt}`
	);

	const getCategoriesData = getCategories(`?categoryType=theme`);

	const [featured, themes, categories] = await Promise.all([
		getFeaturedThemesData,
		getThemesData,
		getCategoriesData,
	]);

	return settings?.data?.maintenance === false ? (
		<List
			featured={featured}
			objects={themes}
			searchParams={awtdSearchParams}
			categories={categories}
		/>
	) : (
		<ErrorPage />
	);
};

export default ThemeIndex;
