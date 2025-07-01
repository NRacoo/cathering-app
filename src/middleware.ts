import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";
import { getToken } from "next-auth/jwt";

export async function mainmiddleware(request : NextRequest){
    const res = NextResponse.next()
    const token = await getToken({req: request, secret: process.env.NEXTAUTH_SECRET})
    const userCookie = request.cookies.get('next-auth.session-token')
    console.log('token', token)
    console.log('userCookie', userCookie)
    return res
}   

export default withAuth(mainmiddleware, ['/dashboard', '/Profile'])