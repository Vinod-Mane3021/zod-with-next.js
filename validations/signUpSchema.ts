import { z } from "zod";
import { emailValidation, passwordValidation, usernameValidation } from "./index";

export const signUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
})


