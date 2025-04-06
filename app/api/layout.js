import { CookiesProvider } from "next-client-cookies/server";

const APILayout = async ({ children }) => {
	return <CookiesProvider>{children}</CookiesProvider>;
};

export default APILayout;
