import {
	fetchurl,
	getAuthTokenOnServer,
	setAuthTokenOnServer,
	setUserOnServer,
} from "@/helpers/fetchurl";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);

	let token;

	token = await getAuthTokenOnServer();
	token = searchParams.get("xAuthToken");

	const secret_token = searchParams.get("armed_code_sk");

	console.log("token in route handler", token);
	console.log("secret_token in route handler", secret_token);

	if (!token) {
		return NextResponse.json({ error: "Token missing" }, { status: 400 });
	}

	// Redirect to a clean URL without token for security
	const response = NextResponse.redirect(new URL("/api", req.url));

	// Set token in secure cookie
	await setAuthTokenOnServer(token);

	const user = await fetchurl(`/auth/me`, "GET", "default");

	await setUserOnServer(user.data);

	return response;
}
