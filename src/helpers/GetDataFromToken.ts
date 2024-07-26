import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined in environment variables.");
    }

    if (!token) {
      throw new Error("No token found in cookies.");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    return decodedToken;
  } catch (error: any) {
    console.error("Error verifying token:", error.message);
    throw new Error("Invalid or expired token.");
  }
};
