import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
	{
		path: "/admin/login",
		whenAuth: "redirect",
	},
	{
		path: "/login",
		whenAuth: "redirect",
	},
];

const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";
const REDIRECT_WHEN_AUTHENTICATED_AS_ADMIN = "/admin";
const REDIRECT_WHEN_AUTHENTICATED = "/";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const publicRoute = publicRoutes.find((route) => route.path === path);
	// const adminToken = request.cookies.get("admin@solvus-token");
	const loginToken = request.cookies.get("login@solvus-token");

	// if (!loginToken && publicRoute) {
	// 	return NextResponse.next();
	// }

	// if (!loginToken && !publicRoute) {
	// 	const redirectUrl = request.nextUrl.clone();
	// 	redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

	// 	return NextResponse.redirect(redirectUrl);
	// }

	// if (loginToken && publicRoute && publicRoute.whenAuth === "redirect") {
	// 	const redirectUrl = request.nextUrl.clone();
	// 	redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;

	// 	return NextResponse.redirect(redirectUrl);
	// }

	if (loginToken && !publicRoute) {
		// Check token expires in

		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
