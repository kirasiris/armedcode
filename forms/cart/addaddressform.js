"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchurl } from "@/helpers/fetchurl";

const AddAddressForm = ({ objectId = 0 }) => {
	const router = useRouter();

	const [btnText, setBtnText] = useState("Submit");

	const createAddress = async (e) => {
		e.preventDefault();
		setBtnText(`Processing...`);

		const form = e.target;
		const formData = new FormData(form);

		const rawFormData = {
			address: formData.get("address"),
		};

		const res = await fetchurl(
			`/protected/addresses`,
			"POST",
			"no-cache",
			rawFormData,
			undefined,
			false,
			false,
		);

		if (res.status === "error") {
			toast.error(res.message);
			setBtnText("Submit");
			return;
		}
		if (res.status === "fail") {
			toast.error(res.message);
			setBtnText("Submit");
			return;
		}
		toast.success("Address has been added");
		router.push(`/cart/${objectId}`);
	};

	const resetForm = () => {
		e.target.closest("form").reset();
	};

	return (
		<form onSubmit={createAddress}>
			<label htmlFor="address" className="form-label">
				Address
			</label>
			<input
				id="address"
				name="address"
				type="text"
				className="form-control text-bg-dark mb-3"
				required
				placeholder="John Doe"
				defaultValue=""
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

export default AddAddressForm;
