import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr", "es", "zh", "hi"];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
	const acceptLang = request.headers.get("accept-language") || "";
  	const userPreferred = locales.find((lang) => acceptLang.includes(lang));
	return userPreferred || defaultLocale;
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/_next") || pathname.startsWith("/api")  || pathname.includes(".")) {
		return;
	}

	if (pathname === "/favicon.ico") {
		return NextResponse.next();
	}

	const hasLocale = locales.some((loc) =>
		pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
	);
	if (hasLocale) return;

	// Locale missing → redirect based on browser preference
	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;
	return NextResponse.redirect(request.nextUrl);
}

export const config = {matcher: ["/((?!_next).*)"],};