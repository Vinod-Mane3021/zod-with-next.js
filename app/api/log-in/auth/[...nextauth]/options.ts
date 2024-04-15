import { errorMessages } from "@/constants/validationMessages";
import { comparePassword } from "@/lib/bcrypt";
import dbConnect from "@/lib/dbConnect";
import { findUserByEmailOrUsername } from "@/services/user.service";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { off } from "process";
dbConnect

type credentialsType = {
    email: string,
    password: string
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "enter your email" },
                password: { label: "Password", type: "password" }
            },
            // TODO: check type of credentials
            async authorize(credentials, req): Promise<any>{
                await dbConnect()
                try {
                    if(!credentials) {
                        throw new Error(errorMessages.invalidCredentials);
                    }
                    const email = credentials.identifier.email
                    const password = credentials.identifier.password
                    const user = await findUserByEmailOrUsername(email, password)
                    if(!user) {
                        throw new Error(errorMessages.userNotFound)
                    }
                    if(!user.isVerified) {
                        throw new Error(errorMessages.userNotVerified)
                    }
                    const isPasswordCorrect = await comparePassword(credentials.password, user.password)
                    if(!isPasswordCorrect) {
                        throw new Error(errorMessages.incorrectPassword)
                    }
                    return user
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ]
}