import { fetchurl } from "@/helpers/fetchurl";
import List from "@/components/store/list";
import ErrorPage from "@/layout/errorpage";
import Globalcontent from "@/layout/content";
import Header from "@/layout/header";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";
import SearchBar from "@/layout/store/searchbar";

async function getProducts(params) {
	const res = await fetchurl(
		`/global/products${params}&postType=product&status=published`,
		"GET",
		"no-cache",
	);
	return res;
}

const StoreIndex = async ({ params, searchParams }) => {
	const awtdSearchParams = await searchParams;
	const page = awtdSearchParams.page || 1;
	const limit = awtdSearchParams.limit || 10;
	const sort = awtdSearchParams.sort || "-createdAt";
	const decrypt = awtdSearchParams.decrypt === "true" ? "&decrypt=true" : "";

	const { auth, settings } = await getGlobalData();

	const getProductsData = getProducts(
		`?page=${page}&limit=${limit}&sort=${sort}${decrypt}`,
	);

	const [products] = await Promise.all([getProductsData]);

	return (
		<>
			<Head
				title={`${settings?.data?.title} - Store`}
				description="Discover our curated selection of firearms, accessories, and tactical equipment. Built for reliability, designed for performance."
				favicon={settings?.data?.favicon}
				postImage={settings.data.showcase_image}
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/store`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			{settings?.data?.maintenance === false ? (
				<>
					<Header
						title="Store"
						description="Discover our curated selection of firearms, accessories, and tactical equipment. Built for reliability, designed for performance."
					/>
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
						auth={auth}
						objects={products}
						searchedKeyword=""
						searchParams={awtdSearchParams}
					/>
				</>
			) : (
				<ErrorPage />
			)}
		</>
	);
};

export default StoreIndex;
