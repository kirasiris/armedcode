import Image from "next/image";
import { revalidatePath } from "next/cache";
import FormButtons from "@/components/global/formbuttons";
import { fetchurl } from "@/helpers/fetchurl";
import Head from "@/app/head";
import ErrorPage from "@/layout/errorpage";
import Services from "@/components/services";

async function getSetting(params) {
	const res = await fetchurl(`/settings/${params}`, "GET", "default");
	return res;
}

const Home = async () => {
	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	const createContact = async (formData) => {
		"use server";
		const rawFormData = {
			name: formData.get("name"),
			email: formData.get("email"),
			subject: formData.get("subject"),
			text: formData.get("text"),
		};
		await fetchurl(`/emails`, "POST", "no-cache", rawFormData);
		revalidatePath(`/`);
	};
	return settings?.data?.maintenance === false ? (
		<>
			<Head
				title={settings.data.title}
				description={settings.data.text}
				favicon={settings.data.favicon}
				postImage={settings.data.showcase_image}
				imageWidth="800"
				imageHeight="450"
				videoWidth=""
				videoHeight=""
				card="summary"
				robots=""
				category=""
				url="/"
				author={settings.data.author}
				createdAt={settings.data.createdAt}
				updatedAt={settings.data.updatedAt}
				locales=""
				posType="website"
			/>
			<header className="bg-dark text-bg-dark py-5">
				<div className="container py-5">
					<h1 className="display-1 text-center text-uppercase">
						NFA Transfers and Software Development
					</h1>
					<p className="display-6 text-center text-uppercase">
						Streamlining your NFA transfers and building powerful software
						solutions for your business needs.
					</p>
					<div className="text-center">
						<a className="btn btn-light me-1">Get Started</a>
						<a className="btn btn-secondary ms-1">Learn More</a>
					</div>
				</div>
			</header>
			{/* OUR SERVICES */}
			<Services />
			{/* BUSINESS */}
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
								src={
									settings.data.showcase_image ||
									"https://www.ijwhite.com/wp-content/uploads/2017/05/placeholder-800x400.jpeg"
								}
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
			{/* CONTACT US */}
			<section className="bg-black text-bg-dark py-5">
				<div className="container">
					<h2 className="text-center">CONTACT US</h2>
					<p className="text-center text-secondary">
						Ready to get started? Reach out to discuss your NFA transfer or
						software development needs.
					</p>
					<div className="row">
						<div className="col-lg-6 mb-3">
							<div className="border border-1 my-border-color p-5 rounded">
								<h3>Send Us a Message</h3>
								<p className="text-secondary">
									Fill out the form below and we&apos;ll get back to you
									shortly.
								</p>
								<form action={createContact}>
									<label htmlFor="name" className="form-label">
										Name
									</label>
									<input
										id="name"
										name="name"
										type="text"
										className="form-control text-bg-dark mb-3"
										placeholder="John Doe"
									/>
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<input
										id="email"
										name="email"
										type="email"
										className="form-control text-bg-dark mb-3"
										placeholder="john@doe.com"
									/>
									<label htmlFor="subject" className="form-label">
										Service Interested In
									</label>
									<select
										id="subject"
										name="subject"
										className="form-control text-bg-dark mb-3"
									>
										<option value="none">Choose an option</option>
										<option value="nfa-transfer">NFA Transfers</option>
										<option value="software-development">
											Software Development
										</option>
									</select>
									<label htmlFor="text" className="form-label">
										Message
									</label>
									<textarea
										id="text"
										name="text"
										className="form-control text-bg-dark mb-3"
										placeholder={`Here goes the message`}
										rows="3"
									/>
									<FormButtons />
								</form>
							</div>
						</div>
						<div className="col-lg-6 mb-3">
							<div className="border border-1 my-border-color p-5 rounded">
								<h3>Contact Information</h3>
								<p className="text-secondary">
									Reach out directly through any of these channels.
								</p>
								<ul className="list-unstyled">
									<li>
										<p className="fw-bold mb-0">Phone</p>
										<p className="text-secondary mb-0">682-375-9607</p>
										<p className="text-secondary">Monday-Friday, 9am-6pm</p>
									</li>
									<li>
										<p className="fw-bold mb-0">Email</p>
										<p className="text-secondary mb-0">
											{process.env.NEXT_PUBLIC_WEBSITE_EMAIL}
										</p>
										<p className="text-secondary">
											We&apos;ll respond within 24 hours
										</p>
									</li>
								</ul>
								<div className="bg-dark p-4 rounded">
									<h4>Business Hours</h4>
									<ul className="list-unstyled">
										<li className="d-flex justify-content-between">
											<span>Friday</span>
											<span>6:00 PM - 10:00 PM</span>
										</li>
										<li className="d-flex justify-content-between">
											<span>Saturday</span>
											<span>9:00 AM - 6:00 PM</span>
										</li>
										<li className="d-flex justify-content-between">
											<span>Sunday</span>
											<span>9:00 AM - 6:00 PM</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	) : (
		<ErrorPage />
	);
};

export default Home;
