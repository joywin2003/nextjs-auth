import { request } from "http";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import getErrorMessage from "@/utils/getErrorMessage";

const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedId: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedId.id;
  } catch (error:unknown) {
    console.error("Error getting data from token:", getErrorMessage(error));
  }
};
export default getDataFromToken;
