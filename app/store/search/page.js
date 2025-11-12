import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/store/list";
import ErrorPage from "@/layout/errorpage";
import Header from "@/layout/header";
import SearchBar from "@/layout/store/searchbar";

async function getAuthenticatedUser() {
	const res = await fetchurl(`/auth/me`, "GET", "no-cache");
	return res;
}

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getProducts(params) {
	const res = await fetchurl(
		`/global/products${params}&status=published`,
		"GET",
		"no-cache"
	);
	return res;
}

const StoreSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const auth = await getAuthenticatedUser();
	const keyword = awtdSearchParams.keyword;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

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

	const getProductsData = getProducts(
		`?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${categoryQuery}${typeQuery}${subCategoryQuery}${decrypt}`
	);

	const [products] = await Promise.all([getProductsData]);

	return settings?.data?.maintenance === false ? (
		<>
			<Header
				title="Premium tactical gear for professionals"
				description="Discover our curated selection of firearms, accessories, and tactical equipment. Built for reliability, designed for performance."
			/>
			<section className="bg-dark py-5 text-bg-dark">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<SearchBar />
						</div>
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
	);
};

export default StoreSearchIndex;
