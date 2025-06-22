import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/login", role: "user", whenAuth: "redirect" },
  { path: "/admin/login", role: "admin", whenAuth: "redirect" },
  { path: "/chat/:chat", whenAuth: "allow" },
];

const REDIRECTS = {
  user: {
    login: "/login",
    dashboard: "/",
  },
  admin: {
    login: "/admin/login",
    dashboard: "/dashboard",
  },
};

function matchRoute(pathname: string, routePath: string) {
  const routePattern = new RegExp(
    "^" +
      routePath
        .replace(/:[^\/]+/g, "[^/]+") // /chat/:chat → /chat/[^/]+
        .replace(/\//g, "\\/") +
      "$"
  );
  return routePattern.test(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const loginToken = request.cookies.get("login@solvus-token");
  const adminToken = request.cookies.get("admin@solvus-token");

  const isAuthenticatedUser = !!loginToken;
  const isAuthenticatedAdmin = !!adminToken;

  const isAdminPath = pathname.startsWith("/dashboard");
  const isPublicRoute = publicRoutes.some((route) =>
    matchRoute(pathname, route.path)
  );
  const routeConfig = publicRoutes.find((route) =>
    matchRoute(pathname, route.path)
  );

  // Proteção de rotas privadas Admin
  if (isAdminPath && !isAuthenticatedAdmin) {
    if (pathname !== REDIRECTS.admin.login) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECTS.admin.login;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Proteção de rotas privadas User
  if (!isAdminPath && !isPublicRoute && !isAuthenticatedUser) {
    if (pathname !== REDIRECTS.user.login) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECTS.user.login;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirecionamento de usuários autenticados tentando acessar rotas públicas
  if (routeConfig?.whenAuth === "redirect") {
    if (routeConfig.role === "admin" && isAuthenticatedAdmin) {
      if (pathname !== REDIRECTS.admin.dashboard) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECTS.admin.dashboard;
        return NextResponse.redirect(redirectUrl);
      }
    }

    if (routeConfig.role === "user" && isAuthenticatedUser) {
      if (pathname !== REDIRECTS.user.dashboard) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECTS.user.dashboard;
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
