import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const { data } = await supabase.auth.getSession();

    const publicRoutes = ["/login", "/register"];

    if (!data.session && !publicRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
}

export const config = {
    matcher: ["/((?!_next|api|static|public|favicon.ico).*)"],
};
