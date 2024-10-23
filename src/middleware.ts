import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Extract the requested pathname from the request
  const { pathname } = req.nextUrl;

  // Get user role from the cookie
  const userRole = req.cookies.get("role")?.value || "guest";
  console.log("user role: ", userRole);

  // Example: Restrict routes starting with /user/* for users with role !== 'user'
  if (pathname.startsWith("/user")) {
    if (userRole !== "user") {
      // Redirect to unauthorized page if role isn't user
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Example: Restrict routes starting with /admin/* for users with role !== 'admin'
  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin") {
      // Redirect to unauthorized page if role isn't admin
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // Continue to the requested page if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: ["/user-dashboard", "/admin-dashboard"], // Define the routes to match for middleware
};
