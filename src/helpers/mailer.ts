import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface SendEmailOptions {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

const getEmailTemplate = (emailType: "VERIFY" | "RESET", token: string) => {
  const action =
    emailType === "VERIFY" ? "verify your email" : "reset your password";
  return `
    <p>
      Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to ${action} or copy and paste the link below in your browser.
      <br>
      ${process.env.DOMAIN}/verifyemail?token=${token}
    </p>
  `;
};

const sendEmail = async ({ email, emailType, userId }: SendEmailOptions) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const updateFields =
      emailType === "VERIFY"
        ? { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        : {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
          };

    await User.findByIdAndUpdate(userId, updateFields);

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "427349387b9943",
        pass: "586e278872c1e5",
      },
    });

    const mailOptions = {
      from: "balvantkumarsingh3@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      text:
        emailType === "VERIFY"
          ? "Please verify your email by clicking the link below."
          : "Please reset your password by clicking the link below.", // plain text body
      html: getEmailTemplate(emailType, hashedToken), // HTML body
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
