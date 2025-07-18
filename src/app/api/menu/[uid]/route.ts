import { NextRequest, NextResponse } from "next/server";
import { deleteMenu } from "@/lib/firebase/service";

export async function DELETE (request : NextRequest, {params} : {params : Promise<{uid : string}>}){


    const {uid} = await params

    if(!uid){
        return NextResponse.json({message : 'ID menu tidak ditemukan'}, {status : 400})
    }

    const res = await deleteMenu(uid)
    
    
    if(res?.status){
        return NextResponse.json({message : 'Menu berhasil dihapus'}, {status : 200})
    }else{
        return NextResponse.json({message : 'gagal menghapus menu'}, {status : 500})
    }


}
