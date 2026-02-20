import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/store/list";
import ErrorPage from "@/layout/errorpage";
import Globalcontent from "@/layout/content";
import Header from "@/layout/header";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import SearchBar from "@/layout/store/searchbar";

async function getProducts(params) {
	const res = await fetchurl(
		`/global/products${params}&postType=product&status=published`,
		"GET",
		"no-cache",
	);
	return res;
}

const StoreSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const categoryQuery =
		awtdSearchParams.category !== `` && awtdSearchParams.category !== undefined
			? `&category=${awtdSearchParams.category}`
			: "";
	const typeQuery =
		awtdSearchParams.type !== `` && awtdSearchParams.type !== undefined
			? `&type=${awtdSearchParams.type}`
			: "";
	const subCategoryQuery =
		awtdSearchParams.sub_category !== `` &&
		awtdSearchParams.sub_category !== undefined
			? `&sub_category=${awtdSearchParams.sub_category}`
			: "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { auth, settings } = await getGlobalData();

	const getProductsData = getProducts(
		`?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${categoryQuery}${typeQuery}${subCategoryQuery}${decrypt}`,
	);

	const [products] = await Promise.all([getProductsData]);

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
				url={`/store/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<>
					<Header
						title="Premium tactical gear for professionals"
						description="Discover our curated selection of firearms, accessories, and tactical equipment. Built for reliability, designed for performance."
					/>
					<section className="bg-dark py-5 text-bg-dark">
						<div className="container">
							<div className="row">
								<Globalcontent classList="col-lg-12">
									<SearchBar />
								</Globalcontent>
							</div>
						</div>
					</section>
					<List
						auth={auth}
						objects={products}
						searchedKeyword={keyword}
						searchParams={awtdSearchParams}
					/>
				</>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default StoreSearchIndex;
