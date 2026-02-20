import { redirect } from "next/navigation";
import Header from "@/layout/header";

const DashboardIndex = async ({ params, searchParams }) => {
	const awtdParams = await params;
	const awtdSearchParams = await searchParams;

	// Set cookies
	if (awtdSearchParams?.xAuthToken) {
		redirect(`/auth/set-token?xAuthToken=${awtdSearchParams?.xAuthToken}`);
	}

	return (
		<>
			<Header
				title={`Welcome back!, Root`}
				description="This is the place where you have the full control of your website. Feel free to play with it as you like!"
			/>
		</>
	);
};

export default DashboardIndex;
