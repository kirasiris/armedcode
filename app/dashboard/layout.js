import { Suspense } from "react";
import { redirect } from "next/navigation";
import "@/src/css/admin.css";
import DashboardMenu from "@/components/dashboard/dashboardmenu";
import Loading from "@/app/blog/loading";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

export default async function AdminLayout({ children }) {
	const { auth, settings } = await getGlobalData();

	// Redirect if user is not logged in
	(auth?.error?.statusCode === 401 || !auth?.data?.isOnline) &&
		redirect(
			`${process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL}auth/login?returnpage=${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
		);

	return (
		<Suspense fallback={<Loading />}>
			<Head
				title={`${settings?.data?.title} - Dashboard`}
				description={"Manage business"}
				favicon={settings?.data?.favicon}
				postImage=""
				imageWidth=""
				imageHeight=""
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url={`/dashboard`}
				author=""
				createdAt=""
				updatedAt=""
				locales=""
				posType="page"
			/>
			<div className="container-fluid my-4">
				<div className="row">
					<DashboardMenu />
					<div className="col-lg-11">{children}</div>
				</div>
			</div>
		</Suspense>
	);
}
