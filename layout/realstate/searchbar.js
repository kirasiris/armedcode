"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ objects = [] }) => {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		keyword: "",
		businessType: "",
		type: "",
		bedrooms: "",
		bathrooms: "",
		sort: "-createdAt",
	});

	const { keyword, businessType, type, bedrooms, bathrooms, sort } =
		searchParams;

	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const businessTypeQuery = businessType ? `&businessType=${businessType}` : "";
	const typeQuery = type ? `&type=${type}` : "";
	const bedroomsQuery = bedrooms ? `&bedrooms=${bedrooms}` : "";
	const bathroomsQuery = bathrooms ? `&bathrooms=${bathrooms}` : "";

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`/realstate/search?page=1&limit=10&sort=${sort}${businessTypeQuery}${typeQuery}${bedroomsQuery}${bathroomsQuery}${keywordQuery}`
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
					id="businessType"
					name="businessType"
					value={businessType}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							businessType: e.target.value,
						});
					}}
					className="form-control text-bg-dark mb-3"
				>
					<option value="">Listing Type</option>
					<option value="sale">Sale</option>
					<option value="rent">Rent</option>
				</select>
			</div>
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
					<option value="">Type</option>
					<option value="apartment">Apartment</option>
					<option value="studio">Studio</option>
					<option value="condo">Condo</option>
					<option value="house">House</option>
					<option value="cabin-or-cottage">Cabin</option>
					<option value="loft">Loft</option>
					<option value="room">Room</option>
					<option value="land">Land</option>
					<option value="other">Other</option>
				</select>
			</div>
			<div className="col">
				<select
					id="bedrooms"
					name="bedrooms"
					value={bedrooms}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							bedrooms: e.target.value,
						});
					}}
					className="form-control text-bg-dark mb-3"
				>
					<option value="">Bedrooms</option>
					<option value={1}>1+</option>
					<option value={2}>2+</option>
					<option value={3}>3+</option>
					<option value={4}>4+</option>
				</select>
			</div>
			<div className="col">
				<select
					id="bathrooms"
					name="bathrooms"
					value={bathrooms}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							bathrooms: e.target.value,
						});
					}}
					className="form-control text-bg-dark mb-3"
				>
					<option value="">Bathrooms</option>
					<option value={1}>1+</option>
					<option value={2}>2+</option>
					<option value={3}>3+</option>
					<option value={4}>4+</option>
				</select>
			</div>
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
					<option value="title">Title</option>
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
