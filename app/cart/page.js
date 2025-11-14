import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/cart/list";
import ErrorPage from "@/layout/errorpage";
import { revalidatePath } from "next/cache";

async function getSetting(params) {
	const res = await fetchurl(`/global/settings/${params}`, "GET", "default");
	return res;
}

async function getCarts(params) {
	const res = await fetchurl(`/global/carts${params}`, "GET", "no-cache");
	return res;
}

const CartIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;

	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const page = awtdSearchParams.page || 1;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const carts = await getCarts(`?page=${page}&sort=${sort}${decrypt}`);

	const saveCart = async (objects = []) => {
		"use server";
		const res = await fetchurl(`/protected/stripe/carts`, "POST", "no-cache", {
			items: objects,
			onModel: "Product",
		});
		console.log("cart added", res);
		revalidatePath(`/cart`);
	};

	const updateItemQuantity = async (object) => {
		"use server";
		await fetchurl(
			`/protected/stripe/carts/${object?._id}`,
			"PUT",
			"no-cache",
			{
				productId: object?._id,
			}
		);
		revalidatePath(`/cart`);
	};

	return settings?.data?.maintenance === false ? (
		<List
			objects={carts}
			searchedKeyword=""
			searchParams={awtdSearchParams}
			handleSaveCart={saveCart}
			handleItemQuantity={updateItemQuantity}
		/>
	) : (
		<ErrorPage />
	);
};

export default CartIndex;
