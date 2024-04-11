import { ResponseStatus } from "@/constants/responseStatus";
import { MessageType } from "./messageType";
import HttpStatusCode from "@/constants/httpStatusCode";

export interface ApiResponseType {
    success: boolean;
    status: ResponseStatus;
    statusCode: HttpStatusCode;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<MessageType>;
    data?: any;
}

