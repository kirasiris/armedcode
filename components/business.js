"use client";
import Image from "next/image";

const Business = () => {
	return (
		<section className="bg-dark text-bg-dark py-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<h2>ABOUT OUR BUSINESS</h2>
						<p className="text-secondary">
							With years of experience in both NFA transfers and software
							development, we provide professional services that meet the
							highest standards.
						</p>
						<h3>Why Choose Us?</h3>
						<ul>
							<li>Licensed and experienced NFA dealer</li>
							<li>Professional software development team</li>
							<li>Personalized service and support</li>
							<li>Transparent pricing and processes</li>
						</ul>
					</div>
					<div className="col-lg-6">
						<Image
							src="https://www.ijwhite.com/wp-content/uploads/2017/05/placeholder-800x400.jpeg"
							width="800"
							height="400"
							alt="Business office"
							className="img-fluid rounded"
							style={{
								objectFit: "cover",
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Business;
