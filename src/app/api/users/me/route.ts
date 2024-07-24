import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import sendEmail from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {}
