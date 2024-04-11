import { MessageType } from "@/types/messageType";
import { Schema } from "mongoose";

const MessageSchema: Schema<MessageType> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export default MessageSchema;