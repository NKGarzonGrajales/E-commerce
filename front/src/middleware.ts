import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {NextURL} from "next/dist/server/web/next-url";

export function middleware(request: NextRequest) {
    const {pathname, origin} = request.nextUrl;

    if (
        (pathname.includes("dashboard") || pathname.includes("cart") || pathname.includes("home") || pathname.includes("prueba")) &&
        !request.cookies.get("userData")?.value
    ) {
        const loginURL = new NextURL("/login", origin);
        return NextResponse.redirect(loginURL);
    }

    if ((pathname.includes("login") || pathname.includes("signup")) && request.cookies.get("userData")?.value) {
        const homeURL = new NextURL("/", origin);
        return NextResponse.redirect(homeURL);
    }

    {
        return NextResponse.next();
    }
}
