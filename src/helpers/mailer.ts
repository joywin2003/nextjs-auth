import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function sendEmail(
  emailType: string,
  email: string,
  userId: string
) {
  try {
    const hashedToken = bcryptjs.hashSync(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExp: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExp: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ee1eddc71e9998",
        pass: "dd077676a7f8c5",
      },
    });

    const mailOptions = {
      from: "joywinbennis0987@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Email verification" : "Reset password",
      html: `<p>
      Click
      <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">
        here
      </a>
      to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br>
      ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}
    </p>
    `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
