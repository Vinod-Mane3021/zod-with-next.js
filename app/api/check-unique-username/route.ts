import HttpStatusCode from "@/constants/httpStatusCode";
import { ResponseStatus } from "@/constants/responseStatus";
import { errorMessages, successMessage } from "@/constants/validationMessages";
import nextResponse from "@/lib/apiResponse";
import dbConnect from "@/lib/dbConnect";
import { joinStrings } from "@/lib/joinStrings";
import { findUserByUsernameAndIsVerified } from "@/services/user.service";
import { NextResponseType } from "@/types/responseTypes";
import { UsernameQuerySchema } from "@/validations/schema";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponseType> {

    // TODO: check
    // // check of request method
    // if(request.method != RequestMethod.GET) {
    //     return nextResponse({
    //         success: false,
    //         status: ResponseStatus.INVALID_INPUTS,
    //         statusCode: HttpStatusCode.METHOD_NOT_ALLOWED,
    //         message: errorMessages.methodNotAllowed
    //     })
    // }

    await dbConnect()

    try {
        // demo url - localhost:3000/api/cuu?username=vinod
        const { searchParams } = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }
        // validate
        const result =  UsernameQuerySchema.safeParse(queryParams);
        if (!result.success) {
            const error = result.error.format().username?._errors;
            const message = joinStrings(error);
            return nextResponse({
                success: false,
                status: ResponseStatus.INVALID_INPUTS,
                statusCode: HttpStatusCode.BAD_REQUEST,
                message: message
            })
        }
        const { username } = result.data;
        const existingUser = await findUserByUsernameAndIsVerified(username, true)
        if(existingUser) {
            return nextResponse({
                success: false,
                status: ResponseStatus.USER_ALREADY_EXISTS,
                statusCode: HttpStatusCode.CONFLICT,
                message: errorMessages.usernameAlreadyTaken,
            })
        }
        return nextResponse({
            success: true,
            status: ResponseStatus.SUCCESS,
            statusCode: HttpStatusCode.OK,
            message: successMessage.uniqueUsername,
        })
    } catch (error) {
        console.error(errorMessages.checkUsername + " : " + error);
        return nextResponse({
            success: false,
            status: ResponseStatus.ERROR,
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessages.checkUsername,
        })
    }
}

