"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({}) => {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		keyword: "",
		experience_level: "",
		job_type: "",
		remote: "",
		category: "",
		type: "",
		sub_category: "",
		sort: "-createdAt",
	});

	const { keyword, experience_level, job_type, remote, sort } = searchParams;

	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const experienceLevelQuery = experience_level
		? `&experience_level=${experience_level}`
		: "";
	const jobTypeQuery = job_type ? `&job_type=${job_type}` : "";
	const remoteQuery = remote ? `&remote=${remote}` : "";

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`/job/search?page=1&limit=10&sort=${sort}${experienceLevelQuery}${jobTypeQuery}${remoteQuery}${keywordQuery}`
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
					id="experience_level"
					name="experience_level"
					value={experience_level}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							experience_level: e.target.value,
						});
					}}
					className="form-control text-bg-dark mb-3"
				>
					<option value="all">All</option>
					<option value="graduate">Graduate</option>
					<option value="entry">Entry</option>
					<option value="mid">Mid</option>
					<option value="senior">Senior</option>
				</select>
			</div>
			<div className="col">
				<select
					id="job_type"
					name="job_type"
					value={job_type}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							job_type: e.target.value,
						});
					}}
					className="form-control text-bg-dark mb-3"
				>
					<option value="all">All</option>
					<option value="full-time">Full Time</option>
					<option value="part-time">Part Time</option>
					<option value="commission">Commision</option>
					<option value="contract">Contract</option>
					<option value="internship">Internship</option>
				</select>
			</div>
			<div className="col">
				<select
					id="remote"
					name="remote"
					value={remote}
					onChange={(e) => {
						setSearchParams({
							...searchParams,
							remote: e.target.value,
						});
					}}
					className="form-control text-bg-dark mb-3"
				>
					<option value="all">All</option>
					<option value="hybrid">Hybrid</option>
					<option value="remote">Remote</option>
					<option value="in-office">In Office</option>
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
