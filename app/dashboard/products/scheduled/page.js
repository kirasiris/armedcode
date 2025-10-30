import { revalidatePath } from "next/cache";
import { fetchurl, getUserOnServer } from "@/helpers/fetchurl";
import DashboardStatusesMenu from "@/components/dashboard/dashboardstatusesmenu";
import List from "@/components/dashboard/products/list";

async function getProducts(params) {
	const res = await fetchurl(
		`/global/products${params}&status=scheduled`,
		"GET",
		"no-cache"
	);
	return res;
}

const DashboardProductsScheduledIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";

	const auth = await getUserOnServer();

	const products = await getProducts(
		`?user=${auth?.userId}&page=${page}&limit=${limit}&sort=${sort}`
	);

	const draftIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/products/${id}/draftit`,
			"PUT",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/products/scheduled?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const publishIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/products/${id}/publishit`,
			"PUT",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/products/scheduled?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const trashIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/products/${id}/trashit`,
			"PUT",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/products/scheduled?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const scheduleIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/products/${id}/scheduleit`,
			"PUT",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/products/scheduled?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const handleDelete = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/products/${id}/permanently`,
			"DELETE",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/products/scheduled?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const handleTrashAll = async () => {
		"use server";
		// const rawFormData = {}
		await fetchurl(`/protected/stripe/products/deleteall`, "PUT", "no-cache");
		revalidatePath(
			`/dashboard/products/scheduled?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const handleDeleteAll = async () => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/products/deleteall/permanently`,
			"DELETE",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/products/scheduled?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	return (
		<>
			<DashboardStatusesMenu
				allLink="/dashboard/products"
				publishedLink="/dashboard/products/published"
				draftLink="/dashboard/products/draft"
				scheduledLink="/dashboard/products/scheduled"
				trashedLink="/dashboard/products/trashed"
				categoriesLink=""
				categoryType=""
			/>
			<div className="card rounded-0">
				<List
					stripeChargesEnabled={auth?.userStripeChargesEnabled}
					allLink="/dashboard/products"
					pageText="Products"
					addLink="/dashboard/products/create"
					searchOn="/dashboard/products"
					searchedKeyword=""
					objects={products}
					searchParams={awtdSearchParams}
					handleDraft={draftIt}
					handlePublish={publishIt}
					handleTrash={trashIt}
					handleSchedule={scheduleIt}
					handleDelete={handleDelete}
					handleTrashAllFunction={handleTrashAll}
					handleDeleteAllFunction={handleDeleteAll}
				/>
			</div>
		</>
	);
};

export default DashboardProductsScheduledIndex;
