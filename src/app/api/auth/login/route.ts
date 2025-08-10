import { NextRequest, NextResponse } from "next/server";
import {api} from "@/lib/axios";
import { cookies } from "next/headers";

interface IGetLoginUser {
    accessToken: string
    refreshToken: string
    id: string
    username: string
    firstname: string
    lastname: string 
    gender: string
    image: string
}
export async function POST(request: Request){

    const {username, password} = await request.json();

    try {
        const {data} = await api.post<IGetLoginUser>("/auth/login", {
        username,
        password,
        expiresInMins: 5
        },
        {
            withCredentials: true
        });

        (await cookies()).set({
            name: "token",
            value: data.accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 5
        })

        return new Response(JSON.stringify({ok: "ok", token: data.accessToken}), 
        {
            status: 200,
            headers: {"Content-Type": "application/json"}
        })

    } catch (e){
        console.log(e);
        return NextResponse.json(JSON.stringify({ok: null}));
    }

}