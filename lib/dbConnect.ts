import Env from "@/constants/env";
import { errorMessages, successMessage } from "@/constants/validationMessages";
import mongoose from "mongoose";

type ConnectionStatesType = {
    isConnected?: number;
}

const connection: ConnectionStatesType = {};

const dbConnect = async () => {
    try {
        if (connection.isConnected) {
            console.info(successMessage.dbAlreadyConnected);
            return;
        }
        const uri = Env.database.URI;
        if (!uri) {
            console.error(errorMessages.noDbUri);
            return;
        }
        const dbConnection = await mongoose.connect(uri);
        connection.isConnected = dbConnection.connection.readyState;
        console.log(successMessage.dbConnected);
    } catch (error) {
        console.error(`${errorMessages.dbConnectionFailed} : ${error}`)
        process.exit(1);
    }
}

export default dbConnect;

