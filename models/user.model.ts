import { UserType } from "@/types/userType";
import regexPatterns from "@/utils/regex";
import { errorMessages } from "@/constants/validationMessages";
import mongoose, { Schema, Model, models, model } from "mongoose";
import MessageSchema from "./message.model";
import { PASSWORD_MIN_LENGTH } from "@/constants/validation";

const UserSchema: Schema<UserType> = new Schema({
    username: {
        type: String,
        required: [true, errorMessages.usernameRequired],
        trim: true, 
        unique: true
    },
    email: {
        type: String,
        required: [true, errorMessages.emailRequired],
        unique: true,
        match: [regexPatterns.email, errorMessages.emailValid]
    },
    password: {
        type: String,
        required: [true, errorMessages.passwordRequired],
        minlength: [PASSWORD_MIN_LENGTH, errorMessages.passwordMinLength],
        match: [regexPatterns.password, errorMessages.passwordValid]
    },
    verifyCode: {
        type: String,
        required: [true, errorMessages.verifyCodeRequired],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, errorMessages.verifyCodeExpireRequired]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

// Use existing User model if already defined, otherwise create a new model
const UserModel = models.User as Model<UserType> || model<UserType>("User", UserSchema)

export default UserModel;




