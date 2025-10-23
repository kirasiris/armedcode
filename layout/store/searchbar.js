"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ objects = [] }) => {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		keyword: "",
		category: "",
		type: "",
		sub_category: "",
		sort: "-createdAt",
	});

	const { keyword, category, type, sub_category, sort } = searchParams;

	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const categoryQuery = category ? `&category=${category}` : "";
	const typeQuery = type ? `&type=${type}` : "";
	const subCategoryQuery = sub_category ? `&sub_category=${sub_category}` : "";

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`/store/search?page=1&limit=10&sort=${sort}${categoryQuery}${typeQuery}${subCategoryQuery}${keywordQuery}`
		);
	};

	return (
		<form className="row" onSubmit={searchData}>
			<div className="col-lg-12">
				<input
					id="keyword"
					name="keyword"
					value={keyword}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							keyword: e.target.value,
						});
					}}
					type="text"
					className="form-control text-bg-dark mb-3"
					placeholder="Search by location, address, or property name..."
				/>
			</div>
			<div className="col">
				<select
					id="category"
					name="category"
					value={category}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							category: e.target.value,
						});
					}}
					className="form-control text-bg-dark mb-3"
				>
					<option value="all">Category</option>
					<option value="weapons">Weapons</option>
					<option value="accessories">Accessories</option>
					<option value="clothing">Clothing</option>
				</select>
			</div>
			{category === "weapons" && (
				<div className="col">
					<select
						id="type"
						name="type"
						value={type}
						onChange={(e) => {
							setSearchParams({
								...searchParams,
								type: e.target.value,
							});
						}}
						className="form-control text-bg-dark mb-3"
					>
						<option value="all">Type</option>
						<option value="rifle">Rifle</option>
						<option value="shotgun">Shotgun</option>
						<option value="pistol">Pistol</option>
						<option value="supressor">Supressor</option>
						<option value="short-barrel-rifle">SBR</option>
						<option value="short-barrel-shotgun">SBS</option>
						<option value="any-other-weapon">Any Other Weapon</option>
						<option value="destructive-device">Destructive Device</option>
						<option value="machine-gun">Machine Gun</option>
					</select>
				</div>
			)}
			{category === "accessories" && (
				<div className="col">
					<select
						id="sub_category"
						name="sub_category"
						value={sub_category}
						onChange={(e) => {
							setSearchParams({
								...searchParams,
								sub_category: e.target.value,
							});
						}}
						className="form-control text-bg-dark mb-3"
					>
						<option value="all">All</option>
						<option value="magazines">Magazines</option>
						<option value="buttstocks">Butt Stocks</option>
						<option value="grips">Grips</option>
						<option value="handguards">Handguards</option>
						<option value="slings">Slings</option>
						<option value="optics">Optics</option>
						<option value="mounts">Mounts</option>
						<option value="tools">Tools</option>
					</select>
				</div>
			)}
			{category === "clothing" && (
				<div className="col">
					<select
						id="sub_category"
						name="sub_category"
						value={sub_category}
						onChange={(e) => {
							setSearchParams({
								...searchParams,
								sub_category: e.target.value,
							});
						}}
						className="form-control text-bg-dark mb-3"
					>
						<option value="all">All</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="unisex">Unisex</option>
						<option value="shirts">Shirts</option>
						<option value="shorts">Shorts</option>
						<option value="pants">Pants</option>
						<option value="footwear">Footwear</option>
						<option value="outerwear">Outerwear</option>
					</select>
				</div>
			)}
			<div className="col">
				<select
					id="sort"
					name="sort"
					value={sort}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							sort: e.target.value,
						});
					}}
					className="form-control text-bg-dark mb-3"
				>
					<option value="">Sort</option>
					<option value="title">Name A to Z</option>
					<option value="-title">Name Z to A</option>
					<option value="-createdAt">ASC</option>
					<option value="createdAt">DESC</option>
				</select>
			</div>
			<div className="col-lg-12">
				<button type="submit" className="btn btn-light btn-sm w-100">
					Search
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
