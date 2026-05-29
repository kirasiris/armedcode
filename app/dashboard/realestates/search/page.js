import { revalidatePath } from "next/cache";
import { fetchurl, getUserOnServer } from "@/helpers/fetchurl";
import DashboardStatusesMenu from "@/components/dashboard/dashboardstatusesmenu";
import List from "@/components/dashboard/realestates/list";

async function getRealEstates(params) {
	const res = await fetchurl(
		`/global/realestates${params}&postType=realestate`,
		"GET",
		"no-cache",
	);
	return res;
}

const DashboardRealEstatesSearchIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword || "";
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";

	const auth = await getUserOnServer();

	const realestates = await getRealEstates(
		`?user=${auth?.userId}&page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`,
	);

	const draftIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realestates/${id}/draftit`,
			"PUT",
			"no-cache",
		);
		revalidatePath(
			`/dashboard/realestates/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`,
		);
	};

	const publishIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realestates/${id}/publishit`,
			"PUT",
			"no-cache",
		);
		revalidatePath(
			`/dashboard/realestates/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`,
		);
	};

	const trashIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realestates/${id}/trashit`,
			"PUT",
			"no-cache",
		);
		revalidatePath(
			`/dashboard/realestates/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`,
		);
	};

	const scheduleIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realestates/${id}/scheduleit`,
			"PUT",
			"no-cache",
		);
		revalidatePath(
			`/dashboard/realestates/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`,
		);
	};

	const handleDelete = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realestates/${id}/permanently`,
			"DELETE",
			"no-cache",
		);
		revalidatePath(
			`/dashboard/realestates/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`,
		);
	};

	const handleTrashAll = async () => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realestates/deleteall`,
			"PUT",
			"no-cache",
		);
		revalidatePath(
			`/dashboard/realestates/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`,
		);
	};

	const handleDeleteAll = async () => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realestates/deleteall/permanently`,
			"DELETE",
			"no-cache",
		);
		revalidatePath(
			`/dashboard/realestates/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`,
		);
	};

	return (
		<>
			<DashboardStatusesMenu
				allLink="/dashboard/realestates"
				publishedLink="/dashboard/realestates/published"
				draftLink="/dashboard/realestates/draft"
				scheduledLink="/dashboard/realestates/scheduled"
				trashedLink="/dashboard/realestates/trashed"
				categoriesLink=""
				categoryType=""
			/>
			<div className="card rounded-0">
				<List
					stripeChargesEnabled={auth?.userStripeChargesEnabled}
					allLink="/dashboard/realestates"
					pageText="Real Estates"
					addLink="/dashboard/realestates/create"
					searchOn="/dashboard/realestates"
					searchedKeyword={keyword}
					objects={realestates}
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

export default DashboardRealEstatesSearchIndex;
