import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/store/list";
import ErrorPage from "@/layout/errorpage";
import Header from "@/layout/header";

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

const StoreIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getProductsData = getProducts(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`
	);

	const [products] = await Promise.all([getProductsData]);

	return settings?.data?.maintenance === false ? (
		<>
			<Header
				title="Premium tactical gear for professionals"
				description="Discover our curated selection of firearms, accessories, and tactical equipment. Built for reliability, designed for performance."
			/>
			<List
				objects={products}
				searchedKeyword=""
				searchParams={awtdSearchParams}
			/>
		</>
	) : (
		<ErrorPage />
	);
};

export default StoreIndex;
