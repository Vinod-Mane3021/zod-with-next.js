import { Logger, createLogger } from 'winston';
import { developmentLogger } from './developmentLogger';

let logger: Logger = createLogger({})

if (process.env.NODE_ENV == 'development') {
    logger = developmentLogger()
}

export default logger;



