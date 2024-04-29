import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        authenticated: !!session,
        session
    })
}