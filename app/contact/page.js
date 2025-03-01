import { revalidatePath } from "next/cache";
import FormButtons from "@/components/global/formbuttons";
import { fetchurl } from "@/helpers/fetchurl";

const ContactIndex = async () => {
	const createContact = async (formData) => {
		"use server";
		const rawFormData = {
			name: formData.get("name"),
			email: formData.get("email"),
			subject: formData.get("subject"),
			text: formData.get("text"),
		};
		await fetchurl(`/emails`, "POST", "no-cache", rawFormData);
		revalidatePath(`/contact`);
	};

	return (
		<>
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
	);
};

export default ContactIndex;
