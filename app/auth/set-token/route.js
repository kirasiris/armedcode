import { NextResponse } from "next/server";
import {
	fetchurl,
	getAPITokenOnServer,
	getAuthTokenOnServer,
	setAPITokenOnServer,
	setAuthTokenOnServer,
	setUserOnServer,
} from "@/helpers/fetchurl";

function cleanUrl(url) {
	const parsed = new URL(url);
	parsed.searchParams.delete("xAuthToken");
	parsed.searchParams.delete("armed_code_sk");
	return (
		parsed.origin +
		parsed.pathname +
		(parsed.search ? parsed.search : "") +
		(parsed.hash ? parsed.hash : "")
	);
}

export async function GET(req) {
	const url = new URL(req.url);
	const searchParams = url.searchParams;

	// Get tokens from cookies and URL params
	const tokenFromUrl = searchParams.get("xAuthToken");
	const secretTokenFromUrl = searchParams.get("armed_code_sk");

	const tokenFromCookie = await getAuthTokenOnServer();
	const secretTokenFromCookie = await getAPITokenOnServer();

	console.dir({
		"token from cookie": tokenFromCookie?.value,
		"token from url": tokenFromUrl,
		"secret token from cookie": secretTokenFromCookie?.value,
		"secret token from url": secretTokenFromUrl,
	});

	// Clean URLS
	const redirectUrl = cleanUrl(req.url);

	// Set cookies only if a valid token is found
	if (tokenFromUrl || tokenFromCookie?.value) {
		await setAuthTokenOnServer(tokenFromUrl || tokenFromCookie.value);
	}

	if (secretTokenFromUrl || secretTokenFromCookie?.value) {
		await setAPITokenOnServer(
			secretTokenFromUrl || secretTokenFromCookie.value
		);
	}

	try {
		const user = await fetchurl(`/auth/me`, "GET", "default");
		if (user?.data) await setUserOnServer(user.data);
		else console.warn("User not logged in");
	} catch (err) {
		console.log("Error fetching user data");
	}

	return NextResponse.redirect(redirectUrl);
}
