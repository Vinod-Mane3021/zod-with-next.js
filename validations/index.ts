import { EMAIL_MIN_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from "@/constants/validation"
import { errorMessages } from "@/constants/validationMessages"
import regexPatterns from "@/lib/regex"
import { z } from "zod"

export const usernameValidation = z
    .string()
    .min(USERNAME_MIN_LENGTH, errorMessages.usernameMinLength)
    .max(USERNAME_MAX_LENGTH, errorMessages.usernameMaxLength)
    .regex(regexPatterns.username, errorMessages.usernameValid)

export const emailValidation = z
    .string()
    .email({message: errorMessages.emailValid})
    .min(EMAIL_MIN_LENGTH)
    .regex(regexPatterns.email, errorMessages.emailValid)

export const passwordValidation = z
    .string()
    .min(PASSWORD_MIN_LENGTH, {message: errorMessages.passwordMinLength})