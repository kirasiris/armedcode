import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const token = searchParams.get("xAuthToken");

	if (!token) {
		return NextResponse.json({ error: "Token missing" }, { status: 400 });
	}

	// Set token in secure cookie
	cookies().set({
		name: "xAuthToken",
		value: token,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production" ? true : false,
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		path: "/",
		maxAge: new Date(
			Date.now() + process.env.NEXT_PUBLIC_JWT_COOKIE_EXPIRE * daysInTime
		),
	});

	// Redirect to a clean URL without token for security
	return NextResponse.redirect(new URL("/", req.url));
}
