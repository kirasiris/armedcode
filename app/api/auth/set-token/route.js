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

	// Set token in secure cookie
	if (token) {
		await setAuthTokenOnServer(token);

		const user = await fetchurl(`/auth/me`, "GET", "default");

		if (user?.data) {
			await setUserOnServer(user.data);
		}
	}

	// Redirect to a clean URL without token for security
	return NextResponse.redirect(new URL("/api", req.url));
}
