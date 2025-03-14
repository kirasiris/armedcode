import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("xAuthToken");

	if (!token) {
		return NextResponse.json({ error: "Token missing" }, { status: 400 });
	}

	// Set token in secure cookie
	if (token) {
		const myCookies = await cookies();
		// One day equals to...
		const daysInTime = 24 * 60 * 60 * 1000;
		console.log("setAuthTokenOnServer function was a success", token);
		myCookies.set("xAuthToken", token, {
			secure: process.env.NODE_ENV === "production" ? true : false,
			maxAge: new Date(
				Date.now() + process.env.NEXT_PUBLIC_JWT_COOKIE_EXPIRE * daysInTime
			),
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		});
	}

	// Redirect to a clean URL without token for security
	return NextResponse.redirect(new URL("/api", req.url));
}
