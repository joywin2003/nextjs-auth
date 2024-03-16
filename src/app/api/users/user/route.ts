import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import getDataFromToken from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json({ user, message: "User found" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
