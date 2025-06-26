import { NextRequest, NextResponse } from "next/server";
import { Register } from "@/lib/firebase/service";


export async function POST(request : NextRequest){
    try{
        const req = await request.json()
        const res = await Register(req)
        return NextResponse.json({status: res.status, message: res.message})

    }catch(err){
        console.error("Internal Server Error", err)
        return NextResponse.json({status : 500, message : "Internal Server Error"})
    }
}