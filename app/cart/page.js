import { revalidatePath } from "next/cache";
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

	const { settings } = await getGlobalData();

	const carts = await getCarts(`?page=${page}&sort=${sort}${decrypt}`);

	const saveCart = async (objects = []) => {
		"use server";
		await fetchurl(`/protected/stripe/carts`, "POST", "no-cache", {
			items: objects,
			onModel: "Product",
		});
		revalidatePath(`/cart`);
	};

	const checkout = async (object = {}, objects = []) => {
		"use server";
		const res = await fetchurl(
			`/protected/stripe/carts/checkout/${object?._id}`,
			"POST",
			"no-cache",
			{
				items: objects,
			},
		);
	};

	const clearCart = async (object = {}) => {
		"use server";
		await fetchurl(
			`/protected/stripe/carts/${object?._id}/permanently`,
			"DELETE",
			"no-cache",
		);
		revalidatePath(`/cart`);
	};

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
				<List
					objects={carts}
					handleCheckout={checkout}
					handleSaveCart={saveCart}
					handleClearCart={clearCart}
				/>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default CartIndex;
