import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainmiddleware(request : NextRequest){
    const res = NextResponse.next()
    const userCookie = request.cookies.get('next-auth.session-token')
    console.log(userCookie)
    return res
}

export default withAuth(mainmiddleware, ['/dashboard', '/Profile'])