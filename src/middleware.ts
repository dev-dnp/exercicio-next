
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest){

    const routesProtected = ["/dashboard"];

    const accessProtected = routesProtected.some(route => request.nextUrl.pathname.startsWith(route));

    const urlRedirect = new URL("/login", request.url);
    
    const token = request.cookies.get('token')?.value;

    if(accessProtected && !token){
        return NextResponse.redirect(urlRedirect);
    } 
    return NextResponse.next()
}


export const config = {
    matcher: ["/dashboard/:path*"]
}