import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcrypt from 'bcryptjs'
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";
import { errorMessages, successMessage } from "@/constants/validationMessages";
import { ApiResponseType } from "@/types/ApiResponseType";
import { ResponseStatus } from "@/constants/responseStatus";
import HttpStatusCode from "@/constants/httpStatusCode";
import { asyncHandler } from '@/utils/asyncHandler'

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponseType>> {
    await dbConnect();
    try {
        return NextResponse.json({
            success: true,
            status: ResponseStatus.SUCCESS,
            statusCode: HttpStatusCode.OK,
            message: successMessage.registerUser
        })
    } catch (error) {
        console.error(errorMessages.registerUser, error);
        return NextResponse.json({
            success: true,
            status: ResponseStatus.SUCCESS,
            statusCode: HttpStatusCode.OK,
            message: errorMessages.registerUser
        })
    }
}





