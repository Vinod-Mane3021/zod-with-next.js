import { z } from "zod";
import { emailValidation, passwordValidation } from "./index";

export const singInSchema = z.object({
    email: emailValidation,
    password: passwordValidation
})