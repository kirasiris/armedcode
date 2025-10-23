import { redirect } from "next/navigation";
import Header from "@/layout/header";

const DashboardIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	// Set cookies
	if (awtdSearchParams?.xAuthToken) {
		redirect(`/api/auth/set-token?xAuthToken=${awtdSearchParams?.xAuthToken}`);
	}
	return (
		<>
			<Header
				title={`Welcome back!`}
				description="This is the place where you have full overview of everything you have done in the website!"
			/>
		</>
	);
};

export default DashboardIndex;
