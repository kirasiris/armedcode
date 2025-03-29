import {
	fetchurl,
	getAPITokenOnServer,
	getAuthTokenOnServer,
	setAPITokenOnServer,
	setAuthTokenOnServer,
	setUserOnServer,
} from "@/helpers/fetchurl";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);

	const token = await getAuthTokenOnServer();

	const urlToken = searchParams.get("xAuthToken");

	const secrettoken = await getAPITokenOnServer();

	const urlSecretToken = searchParams.get("armed_code_sk");

	console.dir({
		"token from cookie": token?.value,
		"token from url": urlToken,
		"secret token from cookie": secrettoken?.value,
		"secret token from url": urlSecretToken,
	});

	// Redirect to a clean URL without token for security
	const response = NextResponse.redirect(new URL("/api", req.url));

	// Set token in secure cookie
	await setAuthTokenOnServer(token?.value || urlToken || undefined);

	// Set secret token in secure cookie
	await setAPITokenOnServer(secrettoken?.value || urlSecretToken || undefined);

	const user = await fetchurl(`/auth/me`, "GET", "default");

	await setUserOnServer(user.data);

	return response;
}
