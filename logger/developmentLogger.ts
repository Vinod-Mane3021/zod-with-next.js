import winston, { format, transports, createLogger, Logger, Logform } from "winston";
const { combine, timestamp, label, printf, colorize, simple, json } = format;

import { format as dateFormat } from "date-fns";

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} | ${level}: ${message}`;
});

export const developmentLogger = (): Logger => {
  const logger: Logger = createLogger({
    level: "silly",
    format: combine(
        colorize(),
        simple(),
        timestamp({format: () => dateFormat(new Date(), "dd/MM/yyyy HH:mm:ss"),}),
        myFormat,
    ),
    transports: [
      new transports.Console(),
    ],
  });
  return logger;
};


