import { api } from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

type UserData = {
  data: {
    id: string | number
    firstName: string
    lastName: string
    age: string
    gender: string
    email: string
    image: string
  }
}

export async function GET(req: NextRequest){

    const token = req.cookies.get("token")?.value;

    if(!token){
        return NextResponse.json({ msg: "error", error: "Token não encontrado" }, { status: 401 })
    }

    const {data} : UserData = await api.get("/auth/me", {
        headers: {
            'Authorization': `Bearer ${token}`
        },

        withCredentials: true
    })

    return NextResponse.json({
        msg: "ok",
        data: {
            id: data.id,
            age: data.age,
            firstName: data.firstName,
            gender: data.gender,
            lastName: data.lastName,
            image: data.image,
        }
    });

}