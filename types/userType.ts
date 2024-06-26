import { Document } from 'mongoose'
import { MessageType } from './messageType';

export interface UserType extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: MessageType[]
}