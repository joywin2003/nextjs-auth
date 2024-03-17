import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import getErrorMessage from "@/utils/getErrorMessage";
import { TSignupSchema, signupSchema } from "@/utils/types";

connect();

export async function SignUpSubmitAction(data: TSignupSchema) {
  try {
    const validatedFields = signupSchema.safeParse({
      data,
    });
    
    if (!validatedFields.success) {
        return {
          message: validatedFields.error.message,
        }
      }

    const { email, password, firstname, lastname } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: 409,
        message: "User already exists",
      };
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
    
    return {
      message: "User created successfully",
      status: 201,
      success: true,
      savedUser: savedUser,
    };
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    return {
      message: getErrorMessage(error),
      status: 500,
    };
  }
}
