import Image from "next/image";
import { revalidatePath } from "next/cache";
import { Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import FormButtons from "@/components/global/formbuttons";
import { fetchurl } from "@/helpers/fetchurl";
import Head from "@/app/head";
import ErrorPage from "@/layout/errorpage";

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
		// await fetchurl(`/emails`, "POST", "no-cache", rawFormData);
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
			<section className="bg-black text-bg-dark py-5">
				<div className="container">
					<h2 className="text-center">OUR SERVICES</h2>
					<p className="text-center text-secondary">
						Expertise in both NFA transfers and software development.
					</p>
					<Tab.Container defaultActiveKey="nfatransfers">
						<Nav variant="pills" className="nav-justified mb-3">
							<Nav.Item>
								<Nav.Link
									eventKey="nfatransfers"
									className="my-nav-links text-bg-dark me-1"
								>
									NFA Transfers
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									eventKey="softwaredevelopment"
									className="my-nav-links text-bg-dark ms-1"
								>
									Software Development
								</Nav.Link>
							</Nav.Item>
						</Nav>
						<Tab.Content>
							<Tab.Pane eventKey="nfatransfers">
								<h3>NFA Transfer Services</h3>
								<p className="text-secondary">
									Professional handling of all your NFA item transfers
								</p>
								<div className="row">
									<div className="col">
										<h4>Form 4 Transfers</h4>
										<p className="text-secondary">
											Individual and trust transfers for suppressors, SBRs, and
											more
										</p>
										<h4>eForm Processing</h4>
										<p className="text-secondary">
											Digital submission for faster approval times
										</p>
									</div>
									<div className="col">
										<h4>Form 3 Dealer Transfers</h4>
										<p className="text-secondary">
											Fast and efficient FFL to FFL transfers
										</p>
										<h4>Trust Formation</h4>
										<p className="text-secondary">
											Assistance with NFA trust creation and management
										</p>
									</div>
								</div>
							</Tab.Pane>
							<Tab.Pane eventKey="softwaredevelopment">
								<h3>Software Development</h3>
								<p className="text-secondary">
									Custom software solutions for your business needs
								</p>
								<div className="row">
									<div className="col">
										<h4>Web Applications</h4>
										<p className="text-secondary">
											Responsive, modern web applications built with the latest
											technologies
										</p>
										<h4>Database Solutions</h4>
										<p className="text-secondary">
											Efficient data storage and management systems
										</p>
									</div>
									<div className="col">
										<h4>Mobile Development</h4>
										<p className="text-secondary">
											Native and cross-platform mobile applications
										</p>
										<h4>Custom Integrations</h4>
										<p className="text-secondary">
											Connect your existing systems and streamline workflows
										</p>
									</div>
								</div>
							</Tab.Pane>
						</Tab.Content>
					</Tab.Container>
				</div>
			</section>
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
							<div className="border border-1 p-5 rounded">
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
							<div className="border border-1 p-5 rounded">
								<h3>Contact Information</h3>
								<p className="text-secondary">
									Reach out directly through any of these channels.
								</p>
								<ul className="list-unstyled">
									<li>
										<p className="fw-bold mb-0">Phone</p>
										<p className="text-secondary mb-0">682-375-9607</p>
										<p className="text-secondary">Monday-Friday, 9am-5pm</p>
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
										<li className="list-items-for-schedule justify-content-between">
											<span>Monday - Friday</span>
											<span>9:00 AM - 5:00 PM</span>
										</li>
										<li className="list-items-for-schedule justify-content-between">
											<span>Saturday</span>
											<span>By appointment</span>
										</li>
										<li className="list-items-for-schedule justify-content-between">
											<span>Sunday</span>
											<span>Closed</span>
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
