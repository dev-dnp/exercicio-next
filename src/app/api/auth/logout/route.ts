import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){

    try {

        const response = NextResponse.json(
            {msg: "Logout executado com sucesso!"},
            {status: 200}
        );

        response.cookies.set({

            name: "token",
            value: "",
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0
        
        });

        response.cookies.delete("token");

        return response;

    } catch(e){

        console.log(e);

    }

}