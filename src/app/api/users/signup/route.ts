import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import getErrorMessage from "@/utils/getErrorMessage";

type connnection = Boolean;
let isConnectionEstablished: connnection = false;

connect();


export async function POST(request: NextResponse) {
  {try {
    // if (!isConnectionEstablished) {
    //   await connect();
    //   isConnectionEstablished = true;
    // }else{
    //   console.log("Connection already established");
    // }
    const body = await request.json();
    const { email, password, firstname, lastname } = body.user;
    console.log(body);
    console.log(email, password, firstname, lastname);

    if (!email || !password || !firstname || !lastname) {
      return NextResponse.json({
        status: 400,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 409,
        message: "User already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const savedUser = await new User({
      email: email,
      password: hashedPassword,
      firstName: firstname,
      lastName: lastname,
    }).save();

    console.log("User created successfully:", savedUser);

    sendEmail("VERIFY", email, savedUser._id);

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      success: true,
      savedUser: savedUser,
    });
  } catch (error:unknown) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      message: getErrorMessage(error),
      status: 500,
    });
  }}
}
