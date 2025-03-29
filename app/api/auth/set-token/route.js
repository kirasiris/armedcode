import {
	fetchurl,
	getAuthTokenOnServer,
	setAuthTokenOnServer,
	setUserOnServer,
} from "@/helpers/fetchurl";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);

	const token = await getAuthTokenOnServer();

	const urlToken = searchParams.get("xAuthToken");

	const secret_token = searchParams.get("armed_code_sk");

	console.log("token in route handler", urlToken);
	console.log("secret_token in route handler", secret_token);

	if (!token?.value) {
		return NextResponse.json(
			{ error: "Cookie token missing" },
			{ status: 400 }
		);
	}

	if (!urlToken) {
		return NextResponse.json({ error: "Url token missing" }, { status: 400 });
	}

	// Redirect to a clean URL without token for security
	const response = NextResponse.redirect(new URL("/api", req.url));

	// Set token in secure cookie
	if (token?.value) {
		await setAuthTokenOnServer(token.value);
	} else {
		await setAuthTokenOnServer(urlToken);
	}

	const user = await fetchurl(`/auth/me`, "GET", "default");

	await setUserOnServer(user.data);

	return response;
}
