import { getMenu } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const menu = await getMenu();

        if(menu?.status){
            return NextResponse.json({status: true, statusCode: 200, data: menu.data}, {status: 200})
        }else{
            return NextResponse.json({status: false, statusCode: 500, message: 'Gagal mengambil menu'}, {status: 500})
        }
    }catch(error){
        console.error('error saat mengambil menu', error)
        return NextResponse.json({status: false, statusCode: 500, message: 'Terjadi Kesalahan saat mengambil menu'}, {status: 500})
    }
}