"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchurl } from "@/helpers/fetchurl";

const ApplyCouponForm = ({ objectId = 0 }) => {
	const router = useRouter();

	const [btnText, setBtnText] = useState("Submit");

	const createCouponDiscount = async (e) => {
		e.preventDefault();
		setBtnText(`Processing...`);

		const form = e.target;
		const formData = new FormData(form);

		const rawFormData = {
			couponCode: formData.get("couponCode"),
		};

		const res = await fetchurl(
			`/protected/stripe/carts/${objectId}/applycoupon`,
			"PUT",
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
		setBtnText("Submit");
		toast.success("Coupon submitted");
		resetForm();
		router.push(`/cart/${objectId}`);
	};

	const resetForm = () => {
		e.target.closest("form").reset();
	};

	return (
		<form onSubmit={createCouponDiscount}>
			<label htmlFor="couponCode" className="form-label">
				Coupon
			</label>
			<input
				id="couponCode"
				name="couponCode"
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

export default ApplyCouponForm;
