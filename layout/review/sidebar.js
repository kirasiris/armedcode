"use client";

import FormButtons from "@/components/global/formbuttons";
import Globalsidebar from "../sidebar";
import { fetchurl } from "@/helpers/fetchurl";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Sidebar = ({ returtopageurl = "/" }) => {
	const router = useRouter();

	const [reviewData, setReviewData] = useState({
		title: ``,
		text: ``,
		name: ``,
		email: ``,
		website: ``,
	});

	const { title, text, name, email, website } = reviewData;

	const createReview = async (e) => {
		e.preventDefault();
		const res = await fetchurl(`/comments`, "POST", "no-cache", {
			...reviewData,
			user: undefined,
			status: "published",
			postType: "review",
			onModel: undefined,
		});
		console.log("response from adding comment", res);
		if (res.status === "error") {
			toast.error(res.message, `bottom`);
			return;
		}
		toast.success(`Review added`, `bottom`);
		// resetForm();
		// router.push(returtopageurl);
	};

	const resetForm = () => {
		setReviewData({
			title: ``,
			text: ``,
			name: ``,
			email: ``,
			website: ``,
		});
	};

	return (
		<Globalsidebar>
			<div className="card bg-black text-bg-dark mb-4">
				<div className="card-body">
					<h3>Write a Review</h3>
					<p className="text-secondary">
						Share your experience with our services
					</p>
					<form method="POST" onSubmit={createReview}>
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							id={`title`}
							name={`title`}
							value={title}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									title: e.target.value,
								});
							}}
							type="text"
							className="form-control text-bg-dark mb-3"
							required
							placeholder="Title *"
						/>
						<label htmlFor="text" className="form-label">
							Text
						</label>
						<textarea
							id="text"
							name="text"
							value={text}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									text: e.target.value,
								});
							}}
							className="form-control text-bg-dark mb-3"
							rows="5"
							placeholder="Tell us what you think!"
						/>
						<label htmlFor="name" className="form-label">
							Name
						</label>
						<input
							id={`name`}
							name={`name`}
							value={name}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									name: e.target.value,
								});
							}}
							type="text"
							className="form-control text-bg-dark mb-3"
							required
							placeholder="Name *"
						/>
						<label htmlFor="email" className="form-label">
							Email
						</label>
						<input
							id={`email`}
							name={`email`}
							value={email}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									email: e.target.value,
								});
							}}
							type="email"
							className="form-control text-bg-dark mb-3"
							required
							placeholder="Email *"
						/>
						<label htmlFor="website" className="form-label">
							Website
						</label>
						<input
							id={`website`}
							name={`website`}
							value={website}
							onChange={(e) => {
								setReviewData({
									...reviewData,
									website: e.target.value,
								});
							}}
							type="url"
							className="form-control text-bg-dark mb-3"
							required
							placeholder="Website"
						/>
						<button type="submit" className="btn btn-light btn-sm float-start">
							Submit
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
