import {
	fetchurl,
	setAuthTokenOnServer,
	setUserOnServer,
} from "@/helpers/fetchurl";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("xAuthToken");

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
