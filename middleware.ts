import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    console.log('running middleware');
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const { data: { session } } = await supabase.auth.getSession();
    console.log('session', session);
    if (!session && request.nextUrl.pathname !== '/') {
        console.log('should be redirecting');
        // If there's no session, redirect to the home page
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (session && request.nextUrl.pathname === '/') {
        // If there's a session and the user is on the home page, redirect to the dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/"
  ],
};