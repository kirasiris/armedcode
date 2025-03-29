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
	if (token?.value) {
		await setAuthTokenOnServer(token.value);
	} else {
		await setAuthTokenOnServer(urlToken);
	}

	// Set secret token in secure cookie
	if (secrettoken?.value) {
		await setAPITokenOnServer(secrettoken.value);
	} else {
		await setAPITokenOnServer(urlSecretToken);
	}

	const user = await fetchurl(`/auth/me`, "GET", "default");

	await setUserOnServer(user.data);

	return response;
}
