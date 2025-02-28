import "@/src/css/bootstrap.css";
import "@/src/css/global.css";
import "@/src/css/app.css";
import Head from "@/app/head";
import Menu from "@/layout/menu";
import Footer from "@/layout/footer";
import { fetchurl } from "@/helpers/fetchurl";

async function getSetting(params) {
	const res = await fetchurl(`/settings/${params}`, "GET", "default");
	return res;
}

const RootLayout = async ({ children }) => {
	const settings = await getSetting(process.env.NEXT_PUBLIC_SETTINGS_ID);

	return (
		<html lang="en">
			<Head
				title={settings?.data?.title}
				description={settings?.data?.text}
				favicon={settings?.data?.favicon}
			/>
			<body>
				<Menu />
				<main>{children}</main>
				<Footer canonical={process.env.NEXT_PUBLIC_WEBSITE_URL} />
			</body>
		</html>
	);
};

export default RootLayout;
