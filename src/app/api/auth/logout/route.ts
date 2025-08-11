import { NextResponse } from "next/server";

export async function POST(){

    try {

        const res = NextResponse.json({
            success: true,
            msg: "Sessão terminada com sucesso!"
        }, {status: 200})

        res.cookies.set({
            name: "token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0
        });

        return res;

    } catch(error){

        console.error("A operação falhou: ", error);

        const res = NextResponse.json({
            success: false,
            msg: "A operação (terminar sessão) falhou"
        }, {status: 500})

        return res;
    }

}