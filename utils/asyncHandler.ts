import HttpStatusCode from "@/constants/httpStatusCode"
import { ResponseStatus } from "@/constants/responseStatus"
import { errorMessages, successMessage } from "@/constants/validationMessages"
import { ApiResponseType } from "@/types/ApiResponseType"
import { NextRequest, NextResponse } from "next/server"


export const asyncHandler = (fun: Function) => {
    return async (req: NextRequest): Promise<NextResponse<ApiResponseType>> => {
        try {
            return await fun(req)
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
}

// export default asyncHandler;



