import { ApiResponseType, NextResponseType } from "@/types/responseTypes";
import { NextResponse } from "next/server";

/**
 * Function to send the next response in the API workflow.
 * This function takes in an object of type ApiResponseType, which contains
 * various properties representing the response data such as success status,
 * status code, message, etc. It constructs a NextResponse object with the
 * provided data and returns it.
 * 
 * @param {ApiResponseType} - An object containing response data.
 * @returns {NextResponseType} - A NextResponse object containing the response data. 
 */
const nextResponse = ({
    success,
    status,
    statusCode,
    message,
    isAcceptingMessages,
    messages,
    data
}: ApiResponseType): NextResponseType => {
    // Constructing the response object with the provided data
    const response: ApiResponseType = {
        success,
        status,
        statusCode,
        message,
        isAcceptingMessages,
        messages,
        data
    };
    // Returning a NextResponse object with JSON data and status code
    return NextResponse.json(response, {status: statusCode})
}

export default nextResponse;



