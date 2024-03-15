import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import getDataFromToken from "@/helpers/getDataFromToken";
import { sendEmail } from "@/helpers/mailer";

connect();

export const POST = async (req: NextRequest) => {
  try {
    console.log(11);
    const userId = getDataFromToken(req);

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        status: 400,
        error: "Invalid token",
      });
    }
    console.log(22);

    sendEmail("RESET", user.email, user._id);
    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { password, token } = reqBody;
    console.log(password, token);
    const user = await User.findOne({ forgotPasswordToken: token });

    if (!user) {
      return NextResponse.json({
        status: 400,
        error: "Invalid token",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    await user.save();
    return NextResponse.json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
