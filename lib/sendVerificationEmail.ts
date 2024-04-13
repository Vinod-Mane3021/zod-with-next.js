import { resend } from "@/config/resend";
import HttpStatusCode from "@/constants/httpStatusCode";
import Env from "@/constants/env";
import { ResponseStatus } from "@/constants/responseStatus";
import { errorMessages, successMessage } from "@/constants/validationMessages";
import EmailVerificationTemplate from "@/templates/email-verification";
import { ApiResponseType } from "@/types/responseTypes";
import { SendEmailProps } from "@/types/email";

export const sendVerificationEmail = async ({
    email,
    username,
    verifyCode,
    subject = "Verification code 🔐"
}: SendEmailProps): Promise<ApiResponseType> => {
    try {
        const fromEmail = Env.EMAIL.SEND_EMAIL_FROM
        if(!fromEmail) {
            return {
                success: false,
                status: ResponseStatus.NO_FROM_EMAIL,
                statusCode: HttpStatusCode.NOT_IMPLEMENTED,
                message: errorMessages.provideFromEmail
            }
        }
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [email],
            subject: subject,
            react: EmailVerificationTemplate({ username, verifyCode }),
        });
        return {
            success: true,
            status: ResponseStatus.SUCCESS,
            statusCode: HttpStatusCode.OK,
            message: successMessage.verifyEmailSuccess,
            data: data
        }
    } catch (error) {
        console.error(`${errorMessages.verifyEmailFailed} : ${error}`)
        return {
            success: false,
            status: ResponseStatus.VERIFY_EMAIL_FAILED,
            statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
            message: errorMessages.verifyEmailFailed
        }
    }
}

export default sendVerificationEmail;
