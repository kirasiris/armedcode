"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Globalsidebar from "../sidebar";
import { fetchurl } from "@/helpers/fetchurl";
import UseDropzone from "@/components/global/usedropzone";

const Sidebar = ({ auth = {}, token = null, returtopageurl = "/" }) => {
	const router = useRouter();

	const [reviewData, setReviewData] = useState({
		rating: 10,
		title: ``,
		text: ``,
		website: ``,
		files: [],
		uploadedFileData: [], // Store data from secondary API
	});
	const [btnText, setBtnText] = useState("Submit");

	const { rating, title, text, website } = reviewData;

	const createReview = async (e) => {
		e.preventDefault();
		setBtnText("Processing...");
		const res = await fetchurl(`/global/comments`, "POST", "no-cache", {
			...reviewData,
			user: auth?.data?._id,
			name: auth?.data?.name,
			email: auth?.data?.email,
			onModel: "Comment",
			status: "published",
			postType: "review",
			registeredFrom: process.env.NEXT_PUBLIC_WEBSITE_NAME,
			registeredAt: process.env.NEXT_PUBLIC_WEBSITE_URL,
		});
		if (res.status === "error") {
			toast.error(res.message);
			setBtnText("Submit");
			return;
		}
		setBtnText("Submit");
		toast.success(`Review added`);
		resetForm();
		router.push(returtopageurl);
	};

	const resetForm = () => {
		setReviewData({
			rating: 10,
			title: ``,
			text: ``,
			website: ``,
			files: [],
			uploadedFileData: [], // Store data from secondary API
		});
	};

	return (
		<Globalsidebar>
			<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
				<div className="card-body">
					<h3>Filter Reviews</h3>
					<p className="text-secondary">
						Select rating filters to narrow down reviews
					</p>
					<p>Rating</p>
					<ul className="list-unstyled">
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 10,
									},
								}}
							>
								{[...Array(10)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
							</Link>
							10 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 9,
									},
								}}
							>
								{[...Array(9)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								<i aria-hidden className="fa-regular fa-star"></i>
							</Link>
							9 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 8,
									},
								}}
							>
								{[...Array(8)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(2)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							8 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 7,
									},
								}}
							>
								{[...Array(7)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(3)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							7 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 6,
									},
								}}
							>
								{[...Array(6)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(4)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							6 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 5,
									},
								}}
							>
								{[...Array(5)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(5)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							5 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 4,
									},
								}}
							>
								{[...Array(4)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(6)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							4 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 3,
									},
								}}
							>
								{[...Array(3)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(7)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							3 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 2,
									},
								}}
							>
								{[...Array(2)].map((_, index) => (
									<i key={index} aria-hidden className="fa-solid fa-star"></i>
								))}
								{[...Array(8)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							2 Stars
						</li>
						<li className="d-flex justify-content-between">
							<Link
								href={{
									pathname: `/review`,
									query: {
										rating: 1,
									},
								}}
							>
								<i aria-hidden className="fa-solid fa-star"></i>
								{[...Array(9)].map((_, index) => (
									<i key={index} aria-hidden className="fa-regular fa-star"></i>
								))}
							</Link>
							1 Star
						</li>
					</ul>
					<Link
						href={{
							pathname: `/review`,
							query: {},
						}}
						className="btn btn-light btn-sm w-100"
					>
						Clear
					</Link>
				</div>
			</div>
			{auth?.data?.isOnline && (
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
					<div className="card-body">
						<h3>Write a Review</h3>
						<p className="text-secondary">
							Share your experience with our services
						</p>
						<form onSubmit={createReview}>
							<label htmlFor="rating" className="form-label">
								Rating
							</label>
							<select
								id="rating"
								name="rating"
								value={rating}
								onChange={(e) => {
									setReviewData({
										...reviewData,
										rating: e.target.value,
									});
								}}
								className="form-control text-bg-dark mb-3"
							>
								{[...Array(10)].map((_, index) => (
									<option key={index} value={index + 1}>
										{index + 1}
									</option>
								))}
							</select>
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
								required
								placeholder="Tell us what you think!"
								rows="3"
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
								placeholder="Website"
							/>
							<label htmlFor="files" className="form-label">
								Add Photos or Videos (Optional)
							</label>
							<UseDropzone
								auth={auth}
								token={token}
								id="review-dropzone"
								name="review-dropzone"
								multipleFiles={true}
								onModel="Comment"
								setObjectData={setReviewData}
							/>
							{reviewData.files.length > 0 && (
								<div className="mb-3">
									<div className="row g-3 mb-3">
										{reviewData.uploadedFileData.map((file, index) => {
											// normalize the URL regardless of the response shape
											const url = file || "/placeholder.svg";

											const isImage =
												/\.(jpe?g|png|gif|webp|avif|svg)$/i.test(url) ||
												file?.mimetype?.startsWith?.("image/");

											return (
												<div key={index} className="col-12 col-md-6">
													<div
														className="position-relative border rounded overflow-hidden bg-secondary"
														style={{ aspectRatio: "16/9" }}
													>
														{isImage ? (
															<img
																src={url}
																alt={`Preview ${index + 1}`}
																className="w-100 h-100"
																style={{ objectFit: "cover" }}
															/>
														) : (
															<div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 text-white p-3">
																<span className="fw-semibold text-truncate w-100 text-center">
																	{`File ${index + 1}`}
																</span>
																<small className="opacity-75">
																	No preview available
																</small>
															</div>
														)}

														<button
															type="button"
															className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
															onClick={() =>
																setObjectData((prev) => ({
																	...prev,
																	files: prev.files.filter(
																		(_, i) => i !== index,
																	),
																}))
															}
															aria-label={`Remove ${`file ${index + 1}`}`}
														>
															&times;
														</button>
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}
							<button
								type="submit"
								className="btn btn-light btn-sm float-start"
							>
								{btnText}
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
			)}
		</Globalsidebar>
	);
};

export default Sidebar;
