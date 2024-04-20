import UserModel from "@/models/user.model";
import { MessageType } from "@/types/messageType";
import { UserType } from "@/types/userType";

export const findUserByUsernameAndIsVerified = async (
    username: string,
    isVerified: boolean
) => {
    const user = await UserModel.findOne({
        username,
        isVerified,
    });
    return user;
};
export const findUserByEmail = async (email: string) => {
    const user = await UserModel.findOne({ email });
    return user;
};

export const findUserByUsername = async (username: string) => {
    const user = await UserModel.findOne({username})
    return user;
}

export const createNewUser = async (
    username: string,
    email: string,
    hashedPassword: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    messages: MessageType[]
) => {
    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        isVerified,
        isAcceptingMessage,
        messages,
    });
    const createdUser = await newUser.save();
    return createdUser;
};

export const findUserByEmailOrUsername = async (
    email: string,
    username: string
) => {
    const user = await UserModel.findOne({
        $or: [{ email }, { username }],
    });

    return user;
};
