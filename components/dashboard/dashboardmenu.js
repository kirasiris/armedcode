"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { deleteAuthTokenOnServer } from "@/helpers/fetchurl";

const DashboardMenu = ({ auth = {}, settings = {} }) => {
	const pathname = usePathname();

	const isActive = (path = "") => {
		return pathname === path ? " active text-bg-dark" : "";
	};

	return (
		<>
			{/* Logo/Brand */}
			<div className="d-flex align-items-center gap-2 p-3 border-bottom">
				<div
					className="text-white d-flex align-items-center justify-content-center"
					style={{
						width: 32,
						height: 32,
						backgroundImage: `url(${settings?.data?.favicon || `https://picsum.photos/32/32?blur`})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<div>
					<div className="fw-semibold">
						{process.env.NEXT_PUBLIC_WEBSITE_NAME}
					</div>
					<small>Dashboard</small>
				</div>
			</div>
			{/* Navigation */}
			<div className="py-3">
				<small className="text-uppercase fw-semibold px-3">Navigation</small>
				<nav className="nav flex-column mt-2">
					<Link
						href={{
							pathname: `/dashboard`,
							query: {},
						}}
						className={`nav-link text-bg-secondary d-flex align-items-center gap-2 ${isActive(`/dashboard`)}`}
					>
						Dashboard
					</Link>
					<Link
						href={{
							pathname: `/dashboard/companies`,
							query: {},
						}}
						className={`nav-link text-bg-secondary d-flex align-items-center gap-2 ${isActive(`/dashboard/companies`)}`}
					>
						Companies
					</Link>
					<Link
						href={{
							pathname: `/dashboard/courses`,
							query: {},
						}}
						className={`nav-link text-bg-secondary d-flex align-items-center gap-2 ${isActive(`/dashboard/courses`)}`}
					>
						Courses
					</Link>
					<Link
						href={{
							pathname: `/dashboard/memberships`,
							query: {},
						}}
						className={`nav-link text-bg-secondary d-flex align-items-center gap-2 ${isActive(`/dashboard/memberships`)}`}
					>
						Memberships
					</Link>
					<Link
						href={{
							pathname: `/dashboard/products`,
							query: {},
						}}
						className={`nav-link text-bg-secondary d-flex align-items-center gap-2 ${isActive(`/dashboard/products`)}`}
					>
						Products
					</Link>
					<Link
						href={{
							pathname: `/dashboard/realestates`,
							query: {},
						}}
						className={`nav-link text-bg-secondary d-flex align-items-center gap-2 ${isActive(`/dashboard/realestates`)}`}
					>
						Real Estates
					</Link>
					<Link
						href={{
							pathname: `/dashboard/revenue`,
							query: {},
						}}
						className={`nav-link text-bg-secondary d-flex align-items-center gap-2 ${isActive(`/dashboard/revenue`)}`}
					>
						Revenue
					</Link>
				</nav>
			</div>
			<div className="mt-auto border-top p-3">
				<div className="d-flex align-items-center gap-2 mb-2">
					<Image
						src={
							auth?.data?.files?.avatar?.location?.secure_location ||
							`https://picsum.photos/32/32?blur`
						}
						className="rounded-circle"
						alt={`${auth?.data?.username || "Username"}'s profile's picture`}
						width={32}
						height={32}
						style={{
							objectFit: "cover",
						}}
					/>
					<div>
						<div className="fw-medium small">{auth?.data?.username}</div>
						<small>{auth?.data?.email}</small>
					</div>
				</div>
				<button
					type="button"
					className="nav-link text-bg-secondary d-flex align-items-center gap-2 text-danger"
					onClick={async () => {
						await deleteAuthTokenOnServer();
					}}
				>
					<i className="bi bi-box-arrow-right" />
					Log Out
				</button>
			</div>
		</>
	);

	// return (
	// 	<div className="col-lg-1 mb-3">
	// 		<ul className="list-group">
	// 			<li className={`list-group-item ${isActive(`/dashboard`)}`}>
	// 				<Link href={"/dashboard"}>Dashboard</Link>
	// 			</li>
	// 			<li className={`list-group-item ${isActive(`/dashboard/companies`)}`}>
	// 				<Link href={"/dashboard/companies"}>Companies</Link>
	// 			</li>
	// 			<li className={`list-group-item ${isActive(`/dashboard/courses`)}`}>
	// 				<Link href={"/dashboard/courses"}>Courses</Link>
	// 			</li>
	// 			<li className={`list-group-item ${isActive(`/dashboard/memberships`)}`}>
	// 				<Link href={"/dashboard/memberships"}>Memberships</Link>
	// 			</li>
	// 			<li className={`list-group-item ${isActive(`/dashboard/products`)}`}>
	// 				<Link href={"/dashboard/products"}>Products</Link>
	// 			</li>
	// 			<li className={`list-group-item ${isActive(`/dashboard/realestates`)}`}>
	// 				<Link href={"/dashboard/realestates"}>Real Estate</Link>
	// 			</li>
	// 			<li className={`list-group-item ${isActive(`/dashboard/revenue`)}`}>
	// 				<Link href={"/dashboard/revenue"}>Revenue</Link>
	// 			</li>
	// 		</ul>
	// 	</div>
	// );
};

export default DashboardMenu;
