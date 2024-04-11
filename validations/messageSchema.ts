import { MESSAGE_CONTENT_MAX_LENGTH, MESSAGE_CONTENT_MIN_LENGTH } from "@/constants/validation";
import { errorMessages } from "@/constants/validationMessages";
import { z } from "zod";

export const messagesSchema = z.object({
    content: z
        .string()
        .min(MESSAGE_CONTENT_MIN_LENGTH, errorMessages.contentMinLength)
        .max(MESSAGE_CONTENT_MAX_LENGTH, errorMessages.contentMaxLength)
})  