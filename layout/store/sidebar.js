"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Globalsidebar from "../sidebar";

const Sidebar = ({}) => {
	const router = useRouter();

	const [showWeaponInputs, setShowWeaponInputs] = useState(false);

	const [searchParams, setSearchParams] = useState({
		keyword: "",
		page: 1,
		limit: 10,
		sort: "-createdAt",
		category: "all",
		brand: ``,
		model: ``,
		type: `all`,
		caliber: ``,
		inStock: true,
	});

	const {
		keyword,
		page,
		limit,
		sort,
		category,
		brand,
		model,
		type,
		caliber,
		inStock,
	} = searchParams;

	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`/store/search?page=${page}&limit=${limit}&sort=${sort}${keywordQuery}`
		);
	};

	return (
		<Globalsidebar>
			<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
				<div className="card-body">
					<form onSubmit={searchData}>
						<label htmlFor="keyword" className="form-label">
							Keyword
						</label>
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
							placeholder="Enter search term..."
						/>
						<label htmlFor="category" className="form-label">
							Category
						</label>
						<select
							id="category"
							name="category"
							value={category}
							onChange={(e) => {
								setSearchParams({
									...searchParams,
									category: e.target.value,
								});
								setShowWeaponInputs(e.target.value === "weapons");
							}}
							className="form-control text-bg-dark mb-3"
						>
							<option value="all">All</option>
							<option value="weapons">Weapons</option>
							<option value="accessories">Accessories</option>
							<option value="clothing">Clothing</option>
						</select>
						{showWeaponInputs && (
							<>
								<label htmlFor="brand" className="form-label">
									Brand
								</label>
								<input
									id="brand"
									name="brand"
									value={brand}
									onChange={(e) => {
										setSearchParams({
											...searchParams,
											brand: e.target.value,
										});
									}}
									type="text"
									className="form-control text-bg-dark mb-3"
									placeholder="Enter search term..."
								/>
								<label htmlFor="model" className="form-label">
									Model
								</label>
								<input
									id="model"
									name="model"
									value={model}
									onChange={(e) => {
										setSearchParams({
											...searchParams,
											model: e.target.value,
										});
									}}
									type="text"
									className="form-control text-bg-dark mb-3"
									placeholder="Enter search term..."
								/>
								<label htmlFor="type" className="form-label">
									Weapon Type
								</label>
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
									<option value="all">All</option>
									<option value="rifle">Rifle</option>
									<option value="short-barrel-rifle">Short Barrel Rifle</option>
									<option value="shotgun">Shotgun</option>
									<option value="short-barrel-shotgun">
										Short Barrel Shotgun
									</option>
									<option value="pistol">Pistol</option>
									<option value="supressor">Supressor</option>
									<option value="any-other-weapon">Any Other Weapon</option>
									<option value="destructive-device">Destructive Device</option>
									<option value="machine-gun">Machine Gun</option>
								</select>
								<label htmlFor="caliber" className="form-label">
									Caliber
								</label>
								<input
									id="caliber"
									name="caliber"
									value={caliber}
									onChange={(e) => {
										setSearchParams({
											...searchParams,
											caliber: e.target.value,
										});
									}}
									type="text"
									className="form-control text-bg-dark mb-3"
									placeholder="Enter search term..."
								/>
							</>
						)}
						<label htmlFor="inStock" className="form-label">
							In Stock
						</label>
						<select
							id="inStock"
							name="inStock"
							value={inStock}
							onChange={(e) => {
								setSearchParams({
									...searchParams,
									inStock: e.target.value,
								});
							}}
							className="form-control text-bg-dark mb-3"
						>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
						<label htmlFor="sort" className="form-label">
							Sort
						</label>
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
							<option value="title">Title</option>
							<option value="-createdAt">ASC</option>
							<option value="createdAt">DESC</option>
							<option value="-averageRating">Highest Rated</option>
							<option value="averageRating">Lowest Rated</option>
						</select>
						<button type="submit" className="btn btn-light btn-sm w-100">
							Submit
						</button>
					</form>
				</div>
			</div>
		</Globalsidebar>
	);
};

export default Sidebar;
