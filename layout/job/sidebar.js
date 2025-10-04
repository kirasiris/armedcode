"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Globalsidebar from "../sidebar";

const Sidebar = ({}) => {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		keyword: "",
		experience_level: "graduate",
		job_type: "full-time",
		starting_at: 0,
		provides_training: false,
		security_clearance: false,
	});

	const {
		keyword,
		experience_level,
		job_type,
		starting_at,
		provides_training,
		security_clearance,
	} = searchParams;

	const keywordQuery =
		keyword !== "" && keyword !== undefined ? `&keyword=${keyword}` : "";
	const experience_levelQuery = experience_level
		? `&experience_level=${experience_level}`
		: "";
	const job_typeQuery = job_type !== "" ? `&job_type=${job_type}` : "";
	const provides_trainingQuery =
		provides_training !== "" ? `&provides_training=${provides_training}` : "";
	const security_clearanceQuery =
		security_clearance !== ""
			? `&security_clearance=${security_clearance}`
			: "";

	const searchData = async (e) => {
		e.preventDefault();
		router.push(
			`/job/search?page=1&limit=10&sort=-createdAt${keywordQuery}${experience_levelQuery}${job_typeQuery}&starting_at=${starting_at}${provides_trainingQuery}${security_clearanceQuery}`
		);
	};

	const resetForm = () => {
		setSearchParams({
			keyword: "",
			experience_level: "graduate",
			job_type: "full-time",
			starting_at: 0,
			provides_training: false,
			security_clearance: false,
		});
	};

	return (
		<Globalsidebar>
			{/* Search box */}
			<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
				<div className="card-body">
					<h3>Filter Jobs</h3>
					<p className="text-secondary">Select filters to narrow down jobs</p>
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
						<label htmlFor="experience_level" className="form-label">
							Experience Level
						</label>
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
							<option value={"graduate"}>Graduate</option>
							<option value={"entry"}>Entry</option>
							<option value={"mid"}>Mid</option>
							<option value={"senior"}>Senior</option>
						</select>
						<label htmlFor="job_type" className="form-label">
							Job Type
						</label>
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
							<option value={"full-time"}>Full Time</option>
							<option value={"part-time"}>Part Time</option>
							<option value={"commission"}>Commission</option>
							<option value={"internship"}>Internship</option>
						</select>
						<label htmlFor="starting_at" className="form-label">
							Starting At
						</label>
						<input
							id="starting_at"
							name="starting_at"
							value={starting_at}
							onChange={(e) => {
								setSearchParams({
									...searchParams,
									starting_at: e.target.value,
								});
							}}
							type="text"
							className="form-control text-bg-dark mb-3"
							placeholder="Enter salary expected..."
						/>
						<label htmlFor="provides_training" className="form-label">
							Provides Training
						</label>
						<select
							id="provides_training"
							name="provides_training"
							value={provides_training}
							onChange={(e) => {
								setSearchParams({
									...searchParams,
									provides_training: e.target.value,
								});
							}}
							className="form-control text-bg-dark mb-3"
						>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
						<label htmlFor="security_clearance" className="form-label">
							Security Clearance
						</label>
						<select
							id="security_clearance"
							name="security_clearance"
							value={security_clearance}
							onChange={(e) => {
								setSearchParams({
									...searchParams,
									security_clearance: e.target.value,
								});
							}}
							className="form-control text-bg-dark mb-3"
						>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
						<button
							type="submit"
							className="btn btn-light btn-sm float-start"
							disabled={keyword.length > 0 ? !true : !false}
						>
							Go!
						</button>
						<button
							type="reset"
							onClick={resetForm}
							className="btn btn-light btn-sm float-end"
						>
							Reset
						</button>
					</form>
				</div>
			</div>
		</Globalsidebar>
	);
};

export default Sidebar;
