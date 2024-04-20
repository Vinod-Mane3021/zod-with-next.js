import { z } from "zod";
import { usernameValidation, verifyCodeValidation } from ".";

export const VerifyCodeSchema = z.object({
    username: usernameValidation,
    verifyCode: verifyCodeValidation
})

export const UsernameQuerySchema = z.object({
    username: usernameValidation
})