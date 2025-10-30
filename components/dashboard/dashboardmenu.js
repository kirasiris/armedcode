"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardMenu = () => {
	const pathname = usePathname();

	const isActive = (path = "") => {
		return pathname === path ? " active" : "";
	};

	return (
		<div className="col-lg-1 mb-3">
			<ul className="list-group">
				<li className={`list-group-item ${isActive(`/dashboard`)}`}>
					<Link href={"/dashboard"}>Dashboard</Link>
				</li>
				<li className={`list-group-item ${isActive(`/dashboard/companies`)}`}>
					<Link href={"/dashboard/companies"}>Companies</Link>
				</li>
				<li className={`list-group-item ${isActive(`/dashboard/courses`)}`}>
					<Link href={"/dashboard/courses"}>Courses</Link>
				</li>
				<li className={`list-group-item ${isActive(`/dashboard/memberships`)}`}>
					<Link href={"/dashboard/memberships"}>Memberships</Link>
				</li>
				<li className={`list-group-item ${isActive(`/dashboard/products`)}`}>
					<Link href={"/dashboard/products"}>Products</Link>
				</li>
				<li className={`list-group-item ${isActive(`/dashboard/realstates`)}`}>
					<Link href={"/dashboard/realstates"}>Real Estate</Link>
				</li>
				<li className={`list-group-item ${isActive(`/dashboard/revenue`)}`}>
					<Link href={"/dashboard/revenue"}>Revenue</Link>
				</li>
			</ul>
		</div>
	);
};

export default DashboardMenu;
