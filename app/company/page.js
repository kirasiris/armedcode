import { fetchurl } from "@/helpers/fetchurl";
import ErrorPage from "@/layout/errorpage";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

async function getCompanies(params) {
	const res = await fetchurl(
		`/global/companies${params}&status=published`,
		"GET",
		"no-cache",
	);
	return res;
}

const CompanyIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getNFATransfersData = getCompanies(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`,
	);

	const [companies] = await Promise.all([getNFATransfersData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Companies`}
				description={"Find companies you might be interested on!"}
				favicon={settings.data.favicon}
				postImage={settings.data.showcase_image}
				imageWidth="800"
				imageHeight="450"
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url="/company"
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<>Nothing to show here</>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default CompanyIndex;
