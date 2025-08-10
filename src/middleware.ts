
import { jwtDecode } from "jwt-decode";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type PayloadUser = {
    id: string | number;
    username:string
    email:string
    firstName:string
    lastName:string
    gender:string
    image:string
}


export function middleware(request: NextRequest){

    const routesProtected = ["/dashboard"];

    const accessProtected = routesProtected.some(route => request.nextUrl.pathname.startsWith(route));

    const urlRedirect = new URL("/login", request.url);

    const response = NextResponse.next();
    
    const token = request.cookies.get('token')?.value;

    if(accessProtected && !token){
        return NextResponse.redirect(urlRedirect);
    } 

    const payload : PayloadUser = jwtDecode(token ?? "");

    console.log(payload.id)
    return NextResponse.next()
}


export const config = {
    matcher: ["/dashboard/:path*"]
}