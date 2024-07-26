import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import sendEmail from "@/helpers/mailer";
import { getDataFromToken } from "@/helpers/GetDataFromToken";

connect();

export async function POST(request: NextRequest) {
  //extract token from data
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    return NextResponse.json({
      message: "User token is not valid",
      status: 400,
    });
  }
  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
