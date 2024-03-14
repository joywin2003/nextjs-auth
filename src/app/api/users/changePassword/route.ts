import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export const POST = async (req: NextRequest) => {
    try {
        const reqBody = await req.json();
        const { oldPassword, newPassword } = reqBody;

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}