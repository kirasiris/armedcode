import { CookiesProvider } from "next-client-cookies/server";
import "@/src/css/bootstrap.css";
import "@/src/css/global.css";
import "@/src/css/app.css";
import Menu from "@/layout/menu";
import Footer from "@/layout/footer";
import { CartProvider } from "@/context/cartcontext";
import { getGlobalData } from "@/helpers/globalData";

const RootLayout = async ({ children }) => {
	const { auth, settings } = await getGlobalData();

	return (
		<html lang="en">
			{/* HEAD SHOULD NEVER BE WITHIN LAYOUT FILE AS IT WILL ALWAYS TRY TO FETCH INFORMATION FROM ITSELF UNLESS CHILD PAGES USE THEIR OWN LAYOUT FILES WHICH ARE NOT BEING USED */}
			<CookiesProvider>
				<CartProvider>
					<body>
						<Menu
							auth={auth}
							title={settings?.data?.title}
							logo={settings?.data?.logo}
							canonical={process.env.NEXT_PUBLIC_WEBSITE_URL}
						/>
						<main>{children}</main>
						<Footer canonical={process.env.NEXT_PUBLIC_WEBSITE_URL} />
					</body>
				</CartProvider>
			</CookiesProvider>
		</html>
	);
};

export default RootLayout;
