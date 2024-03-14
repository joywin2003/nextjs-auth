import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
   try{
    const response = NextResponse.json({
        status: 200,
        message: "Logged out successfully"
    })
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0)});
    return response;
   }catch(error){
    NextResponse.json({
        status: 500,
        error: "Error in logging out"
    })
   }
}

