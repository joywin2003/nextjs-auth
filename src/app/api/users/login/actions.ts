"use server";

import { TLoginSchema } from "@/utils/types";

// export async function handleMyFormSubmit(data: TLoginSchema) {
//   console.log(data.email, data.password + "login");
  
// }

import { cookies } from 'next/headers'

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import getErrorMessage from "@/utils/getErrorMessage";


connect();

export async function handleMyFormSubmit(data: TLoginSchema) {
  try {
    const { email, password } = data;
    console.log(email, password)
    
    if (!email|| !password) {
      return {
        status: 400,
        message: "Missing required fields",
      };
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return {
        status: 401,
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    const response = {
        status: 200,
      message: "User succesfully logged In",
      success: true,
    };
    cookies().set("token", token, { httpOnly: true });

    return response;
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    return {
      message: getErrorMessage(error),
      status: 500,
    };
  }
}