"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { fetchurl } from "@/helpers/fetchurl";
import ParseHtml from "@/layout/parseHtml";

const Single = ({ auth = {}, object = {} }) => {
	const [enrollmentVerification, setEnrollmentVerification] = useState(null);

	// Function to check if the user is enrolled in the current membership
	useEffect(() => {
		const checkEnrollment = async () => {
			if (!auth?.data?._id || !object?._id) return;

			const res = await fetchurl(
				`/subscribers?user=${auth.data._id}&resourceId=${object._id}&onModel=Membership&isPaid=true`,
				"GET",
				"no-cache"
			);
			setEnrollmentVerification(res);
			console.dir({
				authenticatedUserId: auth.data._id,
				responseFromMembership: res.data.user._id,
			});
		};
		checkEnrollment();
	}, [auth, object]);

	const handleFreeEnrollment = async () => {
		await fetchurl(
			`/extras/stripe/subscriptions/memberships/${object?.data?._id}/free`,
			"PUT",
			"no-cache",
			{
				resourceId: object?.data?._id,
				status: "published",
				onModel: "Membership",
				isPaid: true,
				website: process.env.NEXT_PUBLIC_WEBSITE_NAME, // THIS IS IMPORTANT FOR DB
			}
		);

		// Reload entire page
		window.location.reload();
	};

	const handlePaidEnrollment = async () => {
		await fetchurl(
			`/extras/stripe/subscriptions/memberships/${object?.data?._id}/payment`,
			"POST",
			"no-cache",
			{
				resourceId: object?.data?._id,
				status: "published",
				onModel: "Membership",
				isPaid: false,
				website: process.env.NEXT_PUBLIC_WEBSITE_NAME, // THIS IS IMPORTANT FOR DB
			}
		);

		// Redirect to Stripe
		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
		stripe.redirectToCheckout({ sessionId: res?.stripe.id });
	};

	const handleCancellation = async () => {
		await fetchurl(
			`/extras/stripe/subscriptions/memberships/${object?.data?._id}/cancel`,
			"PUT",
			"no-cache"
		);

		// Reload page
		window.location.reload();
	};

	return (
		<div className="col-lg-6">
			<div className="card border border-1 my-border-color bg-black text-bg-dark mb-4">
				<div className="card-header">
					<h6>{object.title}</h6>
					<h3>
						{object.price.inHumanFormat}
						<small className="text-secondary">/month</small>
					</h3>
				</div>
				<div className="card-body">
					<ParseHtml text={object.text} parseAs="p" />
					{auth?.data?.isOnline ? (
						// If enrollment check is still loading
						enrollmentVerification === null ? (
							<p>Checking enrollment...</p>
						) : (
							// If free and not enrolled
							(object?.data?.isFree && !enrollmentVerification?.success && (
								<button onClick={() => handleFreeEnrollment()}>
									Enroll for Free
								</button>
							)) ||
							// If not free and not enrolled
							(!object?.data?.isFree &&
								!enrollmentVerification?.success &&
								(auth.data.stripe.latestStripeCheckoutLink === null ||
								auth?.data?.stripe.latestStripeCheckoutLink === undefined ? (
									<button onClick={() => handlePaidEnrollment()}>
										Pay to Enroll
									</button>
								) : (
									<div className="btn-group">
										<a
											href={auth?.data?.stripe?.latestStripeCheckoutLink}
											target="_blank"
											className="btn btn-dark btn-sm w-100 mb-3"
										>
											There is a checkout session in your account!
										</a>
										<button onClick={() => handleCancellation()}>
											Cancel payment and Enrollment to Membership
										</button>
									</div>
								))) ||
							// If free/not free and already enrolled
							((object?.data?.isFree || !object?.data?.isFree) &&
								enrollmentVerification?.success && (
									<p className="bg-dark text-bg-dark rounded text-center m-0 p-2">
										Already enrolled
									</p>
								))
						)
					) : (
						<a
							href={`${process.env.NEXT_PUBLIC_FOUNDER_WEBSITE_URL}auth/login?returnpage=${process.env.NEXT_PUBLIC_WEBSITE_URL}/api`}
							className="btn btn-light btn-sm w-100"
							target="_blank"
							rel="noreferrer noopener"
						>
							Sign In / Register to get Authentication Access
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default Single;
