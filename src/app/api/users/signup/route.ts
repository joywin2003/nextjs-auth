import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

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

    if (body && Object.values(body.user).every((val) => Boolean(val))) {
      return NextResponse.json({
        status: 400,
        error: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 409,
        error: "User already exists",
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

    return NextResponse.json({
      message: "User created successfully",
      status: 201,
      success: true,
      savedUser: savedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      error: "Something went wrong",
      status: 500,
    });
  }}
}
