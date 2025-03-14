"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TabMenu = () => {
	const pathname = usePathname();

	const isActive = (path = "") => {
		return pathname === path ? " active" : "";
	};
	return (
		<div
			className="nav-justified bg-dark rounded mb-3 nav nav-pills"
			role="tablist"
		>
			<Link
				href={{
					pathname: `/api`,
					query: {},
				}}
				passHref
				legacyBehavior
			>
				<a
					className={`my-nav-links text-bg-dark me-1 nav-link ${isActive(
						`/api`
					)}`}
				>
					Overview
				</a>
			</Link>
			<Link
				href={{
					pathname: `/api/create`,
					query: {},
				}}
				passHref
				legacyBehavior
			>
				<a
					className={`my-nav-links text-bg-dark me-1 nav-link ${isActive(
						`/api/create`
					)}`}
				>
					Create
				</a>
			</Link>
			<Link
				href={{
					pathname: `/api/read`,
					query: {},
				}}
				passHref
				legacyBehavior
			>
				<a
					className={`my-nav-links text-bg-dark me-1 nav-link ${isActive(
						`/api/read`
					)}`}
				>
					Read
				</a>
			</Link>
			<Link
				href={{
					pathname: `/api/update`,
					query: {},
				}}
				passHref
				legacyBehavior
			>
				<a
					className={`my-nav-links text-bg-dark me-1 nav-link ${isActive(
						`/api/update`
					)}`}
				>
					Update
				</a>
			</Link>
		</div>
	);
};

export default TabMenu;
