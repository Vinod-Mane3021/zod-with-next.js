import { Document } from 'mongoose'

export interface MessageType extends Document{
    content: string;
    createdAt: Date;
}