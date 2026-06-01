import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import "@/src/css/admin.css";
import DashboardMenu from "@/components/dashboard/dashboardmenu";
import Loading from "@/app/blog/loading";
import Head from "@/app/head";
import { getGlobalData } from "@/helpers/globalData";

export default async function AdminLayout({ children }) {
	const { auth, settings } = await getGlobalData();

	// Redirect if user is not logged in
	(auth?.error?.statusCode === 401 || !auth?.data?.isOnline) &&
		redirect(`/auth/login`);

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
			<div className="text-bg-secondary border-bottom border-1 border-light p-3 d-flex align-items-center gap-3">
				{/* Mobile menu button - visible on smaller screens */}
				<button
					className="btn btn-light d-lg-none"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#mobileSidebar"
					aria-controls="mobileSidebar"
				>
					<i className="fa-solid fa-bars" />
				</button>
				<h5 className="mb-0">Dashboard</h5>
				<div className="ms-auto">
					<Link
						href={{
							pathname: process.env.NEXT_PUBLIC_WEBSITE_URL,
							query: {},
						}}
						className="btn btn-light btn-sm"
						target="_blank"
					>
						View Site
					</Link>
				</div>
			</div>
			<div className="d-flex">
				{/* Desktop Sidebar - visible on lg and up */}
				<aside className="text-bg-secondary border-end d-none d-lg-flex flex-column">
					<DashboardMenu auth={auth} settings={settings} />
				</aside>
				{/* Smaller Device Sidebar */}
				<div
					className="bg-dark text-bg-dark offcanvas offcanvas-start"
					tabIndex={-1}
					id="mobileSidebar"
					aria-labelledby="mobileSidebarLabel"
				>
					<div className="offcanvas-header border-bottom">
						<h5 className="text-white offcanvas-title" id="mobileSidebarLabel">
							Menu
						</h5>
						<button
							type="button"
							className="btn-close btn-close-white"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						/>
					</div>
					<div className="offcanvas-body p-0 d-flex flex-column">
						<DashboardMenu auth={auth} settings={settings} />
					</div>
				</div>
				<div className="flex-grow-1 min-vh-100">
					<main>
						<section className="p-1">{children}</section>
					</main>
				</div>
			</div>
		</Suspense>
	);
}
