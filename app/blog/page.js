import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/blog/list";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getBlogs(params) {
	const res = await fetchurl(
		`/global/blogs${params}&postType=blog&status=published&category=${process.env.NEXT_PUBLIC_ARMED_CODE_LLC_CATEGORY_ID}`,
		"GET",
		"no-cache",
	);
	return res;
}

const BlogIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getBlogsData = getBlogs(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`,
	);

	const [blogs] = await Promise.all([getBlogsData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Blog`}
				description={"Learn everything about my programming and life journey"}
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/blog`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<List
					objects={blogs}
					searchedKeyword=""
					searchParams={awtdSearchParams}
				/>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default BlogIndex;
