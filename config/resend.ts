import Env from "@/constants/env";
import { Resend } from "resend";


export const resend = new Resend(Env.EMAIL.RESEND_API_KEY)