import { VERIFY_CODE_LENGTH } from "@/constants/validation";
import { errorMessages } from "@/constants/validationMessages";
import { z } from "zod";

export const verifySchema = z.object({
    verifyCode: z.string().length(VERIFY_CODE_LENGTH, errorMessages.verifyCodeLength),
})