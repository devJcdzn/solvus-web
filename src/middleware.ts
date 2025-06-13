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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const loginToken = request.cookies.get("login@solvus-token");
  const adminToken = request.cookies.get("admin@solvus-token");

  const isAuthenticatedUser = !!loginToken;
  const isAuthenticatedAdmin = !!adminToken;

  const isAdminPath = pathname.startsWith("/dashboard");
  const isPublicRoute = publicRoutes.some((route) => route.path === pathname);
  const routeConfig = publicRoutes.find((route) => route.path === pathname);

  // ⚠️ Protegendo rotas privadas
  if (isAdminPath && !isAuthenticatedAdmin) {
    if (pathname !== REDIRECTS.admin.login) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECTS.admin.login;
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (!isAdminPath && !isPublicRoute && !isAuthenticatedUser) {
    if (pathname !== REDIRECTS.user.login) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECTS.user.login;
      return NextResponse.redirect(redirectUrl);
    }
  }

  // ⚠️ Redirecionamento de usuários autenticados tentando acessar rotas públicas
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
