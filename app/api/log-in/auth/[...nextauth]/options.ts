import Env from "@/constants/env";
import { errorMessages } from "@/constants/validationMessages";
import { comparePassword } from "@/lib/bcrypt";
import dbConnect from "@/lib/dbConnect";
import { findUserByEmailOrUsername } from "@/services/user.service";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    if (!credentials) {
                        throw new Error(errorMessages.invalidCredentials);
                    }
                    const email = credentials.identifier.email
                    const password = credentials.identifier.password
                    const user = await findUserByEmailOrUsername(email, password)
                    if (!user) {
                        throw new Error(errorMessages.userNotFound)
                    }
                    if (!user.isVerified) {
                        throw new Error(errorMessages.userNotVerified)
                    }
                    const isPasswordCorrect = await comparePassword(credentials.password, user.password)
                    if (!isPasswordCorrect) {
                        throw new Error(errorMessages.incorrectPassword)
                    }
                    return user
                } catch (error: any) {
                    throw new Error(error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessage = user.isAcceptingMessage;
                token.username = user.username
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessage = token.isAcceptingMessage
            }
            return session;
        }
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt",
    },
    secret: Env.NEXT_AUTH_SECRET,
}