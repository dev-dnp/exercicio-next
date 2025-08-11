import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/axios";

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

interface IUserBody {
    username: string;
    password: string;
}

export async function POST(request: NextRequest){

    const { username, password } : IUserBody = await request.json();

    try {

        const { data } = await api.post<IGetLoginUser>(
            "/auth/login", 
            {
                username: username.trim(),
                password: password.trim(),
                expiresInMins: 5
            },
            {
                withCredentials: true
            }
        );

        const res = NextResponse.json({
            success: true,
            msg: "Usuário autenticado com sucesso!",
            payload: {
                user: {...data}
            }
        }, {status: 200})

        res.cookies.set({
            name: "token",
            value: data.accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 5
        })

        return res;

    } catch (error){

        const res = NextResponse.json({
            success: false,
            msg: "Usuário ou senha inválido!",

        }, {status: 400})

        return res;
    }

}