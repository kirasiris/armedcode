"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchurl } from "@/helpers/fetchurl";

const ContactForm = () => {
	const router = useRouter();

	const [rawFormData, setRawFormData] = useState({
		name: ``,
		email: ``,
		subject: ``,
		text: ``,
	});
	const [btnText, setBtnText] = useState("Submit");
	const { name, email, subject, text } = rawFormData;

	const createContact = async (e) => {
		e.preventDefault();
		setBtnText(`Processing...`);
		const res = await fetchurl(`/emails`, "POST", "no-cache", {
			...rawFormData,
			registeredFrom: process.env.NEXT_PUBLIC_WEBSITE_NAME,
			registeredAt: process.env.NEXT_PUBLIC_WEBSITE_URL,
		});
		if (res.status === "error") {
			toast.error(res.message, "bottom");
			setBtnText("Submit");
			return;
		}
		setBtnText("Submit");
		toast.success("Email sent", "bottom");
		resetForm();
		router.push(`/contact`);
	};

	const resetForm = () => {
		setRawFormData({
			name: ``,
			email: ``,
			subject: ``,
			text: ``,
		});
	};

	return (
		<form onSubmit={createContact}>
			<label htmlFor="name" className="form-label">
				Name
			</label>
			<input
				id="name"
				name="name"
				value={name}
				onChange={(e) => {
					setRawFormData({
						...rawFormData,
						name: e.target.value,
					});
				}}
				type="text"
				className="form-control text-bg-dark mb-3"
				required
				placeholder="John Doe"
			/>
			<label htmlFor="email" className="form-label">
				Email
			</label>
			<input
				id="email"
				name="email"
				value={email}
				onChange={(e) => {
					setRawFormData({
						...rawFormData,
						email: e.target.value,
					});
				}}
				type="email"
				className="form-control text-bg-dark mb-3"
				required
				placeholder="john@doe.com"
			/>
			<label htmlFor="subject" className="form-label">
				Service Interested In
			</label>
			<select
				id="subject"
				name="subject"
				value={subject}
				onChange={(e) => {
					setRawFormData({
						...rawFormData,
						subject: e.target.value,
					});
				}}
				className="form-control text-bg-dark mb-3"
				required
			>
				<option value="none">Choose an option</option>
				<option value="nfa-transfer">NFA Transfers</option>
				<option value="software-development">Software Development</option>
			</select>
			<label htmlFor="text" className="form-label">
				Message
			</label>
			<textarea
				id="text"
				name="text"
				value={text}
				onChange={(e) => {
					setRawFormData({
						...rawFormData,
						text: e.target.value,
					});
				}}
				className="form-control text-bg-dark mb-3"
				required
				placeholder={`Here goes the message`}
				rows="3"
			/>
			<button type="submit" className="btn btn-light btn-sm float-start">
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
	);
};

export default ContactForm;
