import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/cart/list";
import ErrorPage from "@/layout/errorpage";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getCarts(params) {
	const res = await fetchurl(
		`/protected/stripe/carts${params}`,
		"GET",
		"no-cache"
	);
	return res;
}

const CartIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const getCartsData = getCarts(`?page=${page}&sort=${sort}${decrypt}`);

	const [carts] = await Promise.all([getCartsData]);

	return settings?.data?.maintenance === false ? (
		<List objects={carts} searchedKeyword="" searchParams={awtdSearchParams} />
	) : (
		<ErrorPage />
	);
};

export default CartIndex;
