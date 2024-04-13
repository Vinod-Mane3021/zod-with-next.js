import dbConnect from "@/lib/dbConnect";
import bcrypt from 'bcryptjs'
import sendVerificationEmail from "@/lib/sendVerificationEmail";
import { NextRequest, NextResponse } from "next/server";
import { errorMessages, successMessage } from "@/constants/validationMessages";
import { ApiResponseType } from "@/types/responseTypes";
import { ResponseStatus } from "@/constants/responseStatus";
import HttpStatusCode from "@/constants/httpStatusCode";
import nextResponse from "@/lib/apiResponse";
import { createNewUser, findUserByEmail, findUserByUsernameAndIsVerified } from "@/services/user.service";
import { getVerifyCode, getVerifyCodeExpiry, hashPassword } from "@/lib/bcrypt";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponseType>> {
    await dbConnect();
    try {
        const {username, email, password} = await req.json();

        const existingVerifiedUser = await findUserByUsernameAndIsVerified(username, true);
        if(existingVerifiedUser) {
            return nextResponse({
                success: false,
                status: ResponseStatus.USERNAME_ALREADY_TAKEN,
                statusCode: HttpStatusCode.CONFLICT,
                message: errorMessages.usernameAlreadyTaken,
            })
        }
        
        const existingUserByEmail = await findUserByEmail(email);
        // is user already exist and verified
        if(existingUserByEmail && existingUserByEmail.isVerified) {
            return nextResponse({
                success: false,
                status: ResponseStatus.USER_ALREADY_EXISTS,
                statusCode: HttpStatusCode.BAD_REQUEST,
                message: errorMessages.userAlreadyExists,
            })
        }

        const hashedUserPassword = await hashPassword(password) 
        const verifyCode = getVerifyCode();
        const verifyCodeExpiry = getVerifyCodeExpiry();

        if(existingUserByEmail && !existingUserByEmail.isVerified) {
            existingUserByEmail.password = hashedUserPassword;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry

            const user =  await existingUserByEmail.save();
        }

        if(!existingUserByEmail) {
            const createdUser = createNewUser(
                username,
                email,
                hashedUserPassword,
                verifyCode,
                verifyCodeExpiry,
                false,
                true,
                []
            );
            if(!createdUser) {
                return nextResponse({
                    success: true,
                    status: ResponseStatus.INTERNAL_SERVER_ERROR,
                    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    message: errorMessages.userNotCreated,
                })
            }
        }

        // send verification email
        const emailResponse = await sendVerificationEmail({
            email,
            username,
            verifyCode
        })

        if(!emailResponse.success) {
            return nextResponse({
                success: false,
                status: emailResponse.status,
                statusCode: emailResponse.statusCode,
                message: emailResponse.message,
            })
        }

        return nextResponse({
            success: true,
            status: ResponseStatus.SUCCESS,
            statusCode: HttpStatusCode.OK,
            message: successMessage.registerUser,
            data: {
                username, email
            }
        })
    } catch (error) {
        console.error(errorMessages.registerUser, error);
        return nextResponse({
            success: false,
            status: ResponseStatus.INTERNAL_SERVER_ERROR,
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessages.registerUser
        })
    }
}





