import { revalidatePath } from "next/cache";
import { fetchurl, getUserOnServer } from "@/helpers/fetchurl";
import DashboardStatusesMenu from "@/components/dashboard/dashboardstatusesmenu";
import List from "@/components/dashboard/realstates/list";

async function getRealStates(params) {
	const res = await fetchurl(
		`/global/realstates${params}&status=draft`,
		"GET",
		"no-cache"
	);
	return res;
}

const DashboardRealStatesDraftIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";

	const auth = await getUserOnServer();

	const realstates = await getRealStates(
		`?user=${auth?.userId}&page=${page}&limit=${limit}&sort=${sort}`
	);

	const draftIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realstates/${id}/draftit`,
			"PUT",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/realstates/draft?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const publishIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realstates/${id}/publishit`,
			"PUT",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/realstates/draft?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const trashIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realstates/${id}/trashit`,
			"PUT",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/realstates/draft?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const scheduleIt = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realstates/${id}/scheduleit`,
			"PUT",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/realstates/draft?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const handleDelete = async (id) => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realstates/${id}/permanently`,
			"DELETE",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/realstates/draft?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const handleTrashAll = async () => {
		"use server";
		// const rawFormData = {}
		await fetchurl(`/protected/stripe/realstates/deleteall`, "PUT", "no-cache");
		revalidatePath(
			`/dashboard/realstates/draft?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	const handleDeleteAll = async () => {
		"use server";
		// const rawFormData = {}
		await fetchurl(
			`/protected/stripe/realstates/deleteall/permanently`,
			"DELETE",
			"no-cache"
		);
		revalidatePath(
			`/dashboard/realstates/draft?page=${page}&limit=${limit}&sort=${sort}`
		);
	};

	return (
		<>
			<DashboardStatusesMenu
				allLink="/dashboard/realstates"
				publishedLink="/dashboard/realstates/published"
				draftLink="/dashboard/realstates/draft"
				scheduledLink="/dashboard/realstates/scheduled"
				trashedLink="/dashboard/realstates/trashed"
				categoriesLink=""
				categoryType=""
			/>
			<div className="card rounded-0">
				<List
					stripeChargesEnabled={auth?.userStripeChargesEnabled}
					allLink="/dashboard/realstates"
					pageText="Real States"
					addLink="/dashboard/realstates/create"
					searchOn="/dashboard/realstates"
					searchedKeyword=""
					objects={realstates}
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

export default DashboardRealStatesDraftIndex;
