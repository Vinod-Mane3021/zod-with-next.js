const Env = {
    PORT: Number(process.env.PORT) || 4000,
    DOMAIN_BASE_URL: process.env.DOMAIN_BASE_URL,
    database: {
        URI: process.env.MONGODB_URI,
    },
    EMAIL: {
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        SEND_EMAIL_FROM: process.env.SEND_EMAIL_FROM
    }
}

export default Env;


// PG_USER_NAME: process.env.PG_USER_NAME,
        // PG_HOST_NAME: process.env.PG_HOST_NAME,
        // PG_DB_NAME: process.env.PG_DB_NAME,
        // PG_DB_PASSWORD: process.env.PG_DB_PASSWORD,
        // PG_PORT: Number(process.env.PG_PORT),