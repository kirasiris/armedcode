"use client";
import { calculateTimeSincePublished } from "befree-utilities";
import { Suspense, useEffect, useState } from "react";
import ParseHtml from "@/layout/parseHtml";
import Image from "next/image";

const Loading = () => {
	return <>Loading reviews...</>;
};

const Single = ({ object = {} }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const totalFiles = object.files.length;

	// Bootstrap column size logic
	const getColSize = (index) => {
		if (totalFiles === 1) return "col-12";
		if (totalFiles === 2) return "col-12 col-md-6";
		if (totalFiles === 3) {
			return index < 2 ? "col-6" : "col-12";
		}
		if (totalFiles === 4) return "col-6 col-md-3";
		if (totalFiles === 5 || totalFiles === 6) return "col-6 col-md-4";
		return "col-6 col-md-3";
	};

	// Handlers
	const openModal = (index) => {
		setCurrentIndex(index);
		setModalOpen(true);
	};

	const closeModal = () => setModalOpen(false);

	const prevImage = () =>
		setCurrentIndex((prev) => (prev === 0 ? totalFiles - 1 : prev - 1));

	const nextImage = () =>
		setCurrentIndex((prev) => (prev === totalFiles - 1 ? 0 : prev + 1));

	useEffect(() => {
		const handleKey = (e) => {
			if (!modalOpen) return;
			if (e.key === "ArrowLeft") prevImage();
			if (e.key === "ArrowRight") nextImage();
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [modalOpen]);

	return (
		<Suspense fallback={<Loading />}>
			<article className={`${object?._id}`}>
				<div className="card border border-1 my-border-color bg-black text-bg-dark mb-3">
					<div className="card-header d-flex justify-content-between align-items-center">
						<div>
							<p className="fw-bold mb-0">{object?.title}</p>
							<small className="text-secondary">
								<i aria-hidden className="fa-regular fa-calendar me-1" />
								About {calculateTimeSincePublished(object?.createdAt)} by{" "}
								{object?.name}
							</small>
						</div>
						<p className="mb-0">
							{[...Array(object.rating)].map((_, index) => (
								<i key={index} aria-hidden className="fa-solid fa-star"></i>
							))}
						</p>
					</div>
					<div className="card-body">
						<ParseHtml text={object?.text} parseAs="p" classList="mb-0" />
						{object?.files?.length > 0 && (
							<div className="row g-2 mt-3">
								{object.files.map((file, index) => (
									<div
										key={index}
										className={getColSize(index)}
										style={{ cursor: "pointer" }}
										onClick={() => openModal(index)}
									>
										<Image
											alt={`File ${index + 1}`}
											src={
												file?.location?.secure_location || "/placeholder.png"
											}
											className="img-fluid rounded review-images"
											style={{
												width: "100%",
												height: "auto",
												objectFit: "cover",
												display: "block",
											}}
											width={file?.dimensions.width}
											height={file?.dimensions.height}
											sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, 25vw"
										/>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</article>
			{modalOpen && (
				<div
					className="modal show d-block"
					tabIndex="-1"
					role="dialog"
					style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
					onClick={closeModal}
				>
					<div
						className="modal-dialog modal-dialog-centered"
						role="document"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="modal-content bg-transparent border-0">
							<button
								type="button"
								className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
								aria-label="Close"
								onClick={closeModal}
							/>
							<div className="position-relative">
								<Image
									alt={`File ${currentIndex + 1}`}
									src={
										object.files[currentIndex]?.location?.secure_location ||
										"/placeholder.png"
									}
									style={{
										width: "100%",
										height: "auto",
										objectFit: "contain",
										display: "block",
									}}
									className="rounded"
									width={1000}
									height={800}
								/>

								{/* Navigation Buttons */}
								<button
									onClick={prevImage}
									className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
									style={{ opacity: 0.7 }}
								>
									&#8249;
								</button>
								<button
									onClick={nextImage}
									className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
									style={{ opacity: 0.7 }}
								>
									&#8250;
								</button>
							</div>
							<div className="text-white text-center mt-2">
								{currentIndex + 1} / {totalFiles}
							</div>
						</div>
					</div>
				</div>
			)}
		</Suspense>
	);
};

export default Single;
