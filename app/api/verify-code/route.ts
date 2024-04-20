import HttpStatusCode from "@/constants/httpStatusCode";
import { ResponseStatus } from "@/constants/responseStatus";
import { errorMessages, successMessage } from "@/constants/validationMessages";
import nextResponse from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { joinStrings } from "@/lib/joinStrings";
import { findUserByUsername } from "@/services/user.service";
import { NextResponseType } from "@/types/responseTypes";
import { VerifyCodeSchema } from "@/validations/schema";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponseType> {
    await dbConnect(); // Ensure database connection
    try {
        const { username, verifyCode } = await request.json();
        const validationResult  = VerifyCodeSchema.safeParse({username, verifyCode})
        // Validate username and verification code using schema
        if(!validationResult .success) {
            const usernameError = validationResult .error.format().username?._errors;
            const verifyCodeError = validationResult .error.format().verifyCode?._errors;
            const message = joinStrings(usernameError || verifyCodeError);
            return nextResponse({
                success: false,
                status: ResponseStatus.INVALID_INPUTS,
                statusCode: HttpStatusCode.BAD_REQUEST,
                message: message
            })
        }
        // Find user by username
        const user = await findUserByUsername(username)
        if (!user) {    
            return nextResponse({
                success: false,
                status: ResponseStatus.USER_NOT_FOUND,
                statusCode: HttpStatusCode.BAD_REQUEST,
                message: errorMessages.userNotFound,
            })
        }
        // Check user verification status
        if (user.isVerified) {
            return nextResponse({
                success: false,
                status: ResponseStatus.USER_ALREADY_VERIFIED,
                statusCode: HttpStatusCode.BAD_REQUEST,
                message: errorMessages.userAlreadyVerified,
            })
        }

        const isCodeValid = user.verifyCode === verifyCode;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (!isCodeNotExpired) {
            return nextResponse({
                success: false,
                status: ResponseStatus.VERIFY_CODE_EXPIRED,
                statusCode: HttpStatusCode.GONE,
                message: errorMessages.verifyCodeExpired,
            })
        }
        if (!isCodeValid) {
            return nextResponse({
                success: false,
                status: ResponseStatus.INCORRECT_VERIFY_CODE,
                statusCode: HttpStatusCode.BAD_REQUEST,
                message: errorMessages.inCorrectVerifyCode,
            })
        }

        user.isVerified = true;
        const savedUser = await user.save();

        if (!savedUser) {
            return nextResponse({
                success: false,
                status: ResponseStatus.NOT_SAVED,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                message: errorMessages.userNotSaved,
            })
        }

        return nextResponse({
            success: true,
            status: ResponseStatus.SUCCESS,
            statusCode: HttpStatusCode.OK,
            message: successMessage.userVerified,
        })

    } catch (error) {
        console.error("Error while verifying code:", error);
        return nextResponse({
            success: false,
            status: ResponseStatus.INTERNAL_SERVER_ERROR,
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessages.verifyUser
        })
    }
}






