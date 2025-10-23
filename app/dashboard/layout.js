import { CookiesProvider } from "next-client-cookies/server";
import { redirect } from "next/navigation";
import "@/src/css/admin.css";
import { fetchurl } from "@/helpers/fetchurl";
import DashboardMenu from "@/components/dashboard/dashboardmenu";

async function getAuthenticatedUser() {
	const res = await fetchurl(`/auth/me`, "GET", "no-cache");
	return res;
}

export default async function AdminLayout({ children }) {
	const auth = await getAuthenticatedUser();

	// Redirect if user is not logged in
	(auth?.error?.statusCode === 401 || !auth?.data?.isOnline) &&
		redirect(
			`${process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL}auth/login?returnpage=${process.env.NEXT_PUBLIC_WEBSITE_URL}`
		);

	return (
		<CookiesProvider>
			<div className="container-fluid my-4">
				<div className="row">
					<DashboardMenu />
					<div className="col-lg-11">{children}</div>
				</div>
			</div>
		</CookiesProvider>
	);
}
