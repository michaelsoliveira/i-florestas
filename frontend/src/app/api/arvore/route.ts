import { authOptions } from "@/lib/authOptions";
import useClient from "@/services/client"
import { ArvoreType } from "@/types/IArvore";
import { getServerSession } from "next-auth";

import { NextResponse, NextRequest } from "next/server";

export interface GetArvore {
    error: boolean
    arvores: ArvoreType[]
    count: number
    message: string
}

export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions)

    const { searchParams } = new URL(request.url);
    const utId = searchParams.get('utId')
    const page = searchParams.get('page') ?? 1
    const perPage = searchParams.get('perPage') ?? 25
    const order = searchParams.get('order')
    const orderBy = searchParams.get('orderBy')

    const url = `${process.env.NEXT_PUBLIC_API_URL}/arvore/get-all?utId=${utId}&page=${page}&perPage=${perPage}&orderBy=${orderBy}&order=${order}`
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Bearer ${session?.accessToken}`
        }
    })

    const data = await response.json()

    return NextResponse.json({
        ...data
    })
}