import { api } from '@/lib/axios';
import { type NextRequest, NextResponse } from 'next/server';

type UserData = {
    id: string | number
    firstName: string
    lastName: string
    age: string
    gender: string
    email: string
    image: string
}

export async function GET(request: NextRequest){

    const token = request.cookies.get("token")?.value;

    if(!token){
        return NextResponse.json({ 
            success: false,
            msg: "Token não encontrado!"
        }, { status: 401 })
    }

    const { data } = await api.get<UserData>("/auth/me", {
        
        headers: {
            'Authorization': `Bearer ${token}`
        },

        withCredentials: true
    })

    const res = NextResponse.json({
        success: true,
        msg: "Sucesso!",
        payload: {
            user : {
                ...data
            }
        }

    }, {status: 200})

    return res;

}