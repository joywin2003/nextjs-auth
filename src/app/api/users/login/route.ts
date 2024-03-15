import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import getErrorMessage from "@/utils/getErrorMessage";
import { get } from "http";

type connnection = Boolean;
let isConnectionEstablished: connnection = false;

connect();

export async function POST(request: NextResponse) {
  try {
    // if (!isConnectionEstablished) {
    //     await connect();
    //     isConnectionEstablished = true;
    //   }else{
    //     console.log("Connection already established");
    //   }

    console.log(11)
    const reqBody = await request.json();
    console.log(reqBody)
    const { email, password } = reqBody;
    console.log(email, password)
    
    if (!email|| !password) {
      return NextResponse.json({
        status: 400,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json({
        status: 401,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
        status: 200,
      message: "User succesfully logged In",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      message: getErrorMessage(error),
      status: 500,
    });
  }
}
