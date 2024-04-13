import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10;
const VERIFY_CODE_EXPIRY = 1 // in hours

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export const getVerifyCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const getVerifyCodeExpiry = (): Date => {
    const verifyCodeExpiry = new Date();
    verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + VERIFY_CODE_EXPIRY);
    return verifyCodeExpiry;
}