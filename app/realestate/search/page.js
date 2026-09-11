import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/realestates/list";
import ErrorPage from "@/layout/errorpage";
import Globalcontent from "@/layout/content";
import Header from "@/layout/header";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import SearchBar from "@/layout/realestate/searchbar";

async function getRealEstates(params) {
	const res = await fetchurl(
		`/global/realestates${params}&postType=realestate&status=published`,
		"GET",
		"no-cache",
	);
	return res;
}

const RealEstateSearchIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const keyword = awtdSearchParams.keyword;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const businessTypeQuery =
		awtdSearchParams.businessType !== `` &&
		awtdSearchParams.businessType !== undefined
			? `&businessType=${awtdSearchParams.businessType}`
			: "";
	const typeQuery =
		awtdSearchParams.type !== `` && awtdSearchParams.type !== undefined
			? `&type=${awtdSearchParams.type}`
			: "";
	const bedroomsQuery =
		awtdSearchParams.bedrooms !== `` && awtdSearchParams.bedrooms !== undefined
			? `&bedrooms=${awtdSearchParams.bedrooms}`
			: "";
	const bathroomsQuery =
		awtdSearchParams.bathrooms !== `` &&
		awtdSearchParams.bathrooms !== undefined
			? `&bathrooms=${awtdSearchParams.bathrooms}`
			: "";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { settings } = await getGlobalData();

	const getRealEstatesData = getRealEstates(
		`?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${businessTypeQuery}${typeQuery}${bedroomsQuery}${bathroomsQuery}${decrypt}`,
	);

	const [realestates] = await Promise.all([getRealEstatesData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Search results of ${awtdSearchParams.keyword}`}
				description={"Search results..."}
				favicon={settings?.data?.favicon?.location?.secure_location}
				postImage={settings.data.showcase_image?.location?.secure_location}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/realestate/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}${businessTypeQuery}${typeQuery}${bedroomsQuery}${bathroomsQuery}${decrypt}`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<>
					<Header
						title="Find Your Dream Property"
						description="Discover exceptional homes, land, and investment opportunities across the country. Your perfect property is waiting."
					/>
					<section className="bg-black py-5 text-bg-dark">
						<div className="container">
							<div className="row">
								<div className="col text-center border my-border-color py-5">
									<i aria-hidden className="fa-solid fa-house fa-2x" />
									<p className="mb-0">500+</p>
									<p className="text-secondary">Properties Listed</p>
								</div>
								<div className="col text-center border my-border-color py-5">
									<i aria-hidden className="fa-solid fa-user fa-2x" />
									<p className="mb-0">1,200+</p>
									<p className="text-secondary">Happy Clients</p>
								</div>
								<div className="col text-center border my-border-color py-5">
									<i aria-hidden className="fa-solid fa-location-dot fa-2x" />
									<p className="mb-0">50+</p>
									<p className="text-secondary">Cities Covered</p>
								</div>
								<div className="col text-center border my-border-color py-5">
									<i aria-hidden className="fa-solid fa-arrow-trend-up fa-2x" />
									<p className="mb-0">98%</p>
									<p className="text-secondary">Success Rate</p>
								</div>
							</div>
						</div>
					</section>
					<section className="bg-dark py-5 text-bg-dark">
						<div className="container">
							<div className="row">
								<Globalcontent classList="col-lg-12">
									<SearchBar />
								</Globalcontent>
							</div>
						</div>
					</section>
					<List
						objects={realestates}
						searchedKeyword={keyword}
						searchParams={awtdSearchParams}
					/>
				</>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default RealEstateSearchIndex;
