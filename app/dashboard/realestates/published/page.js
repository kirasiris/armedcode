import { revalidatePath } from "next/cache";
import { fetchurl, getUserOnServer } from "@/helpers/fetchurl";
import DashboardStatusesMenu from "@/components/dashboard/dashboardstatusesmenu";
import List from "@/components/dashboard/realestates/list";

async function getRealEstates(params) {
	const res = await fetchurl(
		`/global/realestates${params}&postType=realestate&status=published`,
		"GET",
		"no-cache",
	);
	return res;
}

const DashboardRealEstatesPublishedIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";

	const auth = await getUserOnServer();

	const realestates = await getRealEstates(
		`?user=${auth?.userId}&page=${page}&limit=${limit}&sort=${sort}`,
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
			`/dashboard/realestates/published?page=${page}&limit=${limit}&sort=${sort}`,
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
			`/dashboard/realestates/published?page=${page}&limit=${limit}&sort=${sort}`,
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
			`/dashboard/realestates/published?page=${page}&limit=${limit}&sort=${sort}`,
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
			`/dashboard/realestates/published?page=${page}&limit=${limit}&sort=${sort}`,
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
			`/dashboard/realestates/published?page=${page}&limit=${limit}&sort=${sort}`,
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
			`/dashboard/realestates/published?page=${page}&limit=${limit}&sort=${sort}`,
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
			`/dashboard/realestates/published?page=${page}&limit=${limit}&sort=${sort}`,
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
					searchedKeyword=""
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

export default DashboardRealEstatesPublishedIndex;
