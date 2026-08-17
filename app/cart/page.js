import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/cart/list";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getCarts(params) {
	const res = await fetchurl(`/global/carts${params}`, "GET", "no-cache");
	return res;
}

const CartIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { auth, settings } = await getGlobalData();

	const carts = await getCarts(
		`?user=${auth?.data?._id}&page=${page}&sort=${sort}${decrypt}`,
	);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Cart`}
				description="Check your items before checkout!"
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/cart`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<List objects={carts} />
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default CartIndex;
