

import { NextRequest, NextResponse } from "next/server";
import { Login, uploadMenu } from "@/lib/firebase/service";

export async function POST(req: NextRequest){
    const session = await Login({email: 'hello@seacatering.com'})

    if(!session){
        return NextResponse.json({status: false, statusCode: 401, message: 'Unauthorized'}, {status:401})
    }

    try{
        const data = await req.json();

        const menu = await uploadMenu(data);

        if(menu?.status){
            return NextResponse.json({status: true, statusCode: 200, message: menu.message, id:menu.id})
        }else{
            return NextResponse.json({error: 'gagal mengunggah menu'}, {status:500})
        }
    }catch(error){
        console.error('error saat mengunggah menu', error)
        return NextResponse.json({error: 'Terjadi Kesalahan saat mengunggah menu'}, {status: 500})
    }
}