import { MESSAGE_CONTENT_MAX_LENGTH, MESSAGE_CONTENT_MIN_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, VERIFY_CODE_LENGTH } from "./validation";

export const successMessage = {
    dbAlreadyConnected: "Already connected to database.",
    dbConnected: "Database connection established successfully 🙌.",
    verifyEmailSuccess: "Verification email sent successfully",
    registerUser: "User registered successfully, Please verify your email",
    uniqueUsername: "Username is unique",
    userVerified: "User verified successfully."
}

export const errorMessages = {
    usernameRequired: "Username is required",
    usernameMinLength: `Username must be at least ${USERNAME_MIN_LENGTH} characters`,
    usernameMaxLength: `Username must be no more than ${USERNAME_MAX_LENGTH} characters`,
    usernameValid: `Usernames can contain letters (a-z), digits (0-9), underscores, and periods. The username cannot start with a period nor end with a period. It must also not have more than one period sequentially. Max length is ${USERNAME_MAX_LENGTH} chars.`,
    emailRequired: "Email is required",
    emailValid: "Please use a valid email address",
    passwordRequired: "Password is required",
    passwordMinLength: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    passwordValid: "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
    verifyCodeRequired: "Verify code is required",
    verifyCodeExpireRequired: "Verify code expiry is required",
    verifyCodeLength: `Verify code must be ${VERIFY_CODE_LENGTH} digits`,
    contentMinLength: `Content must be at least ${MESSAGE_CONTENT_MIN_LENGTH} characters long`,
    contentMaxLength: `Content must be at no longer that ${MESSAGE_CONTENT_MAX_LENGTH} characters`,
    noDbUri: "No database URI provided",
    dbConnectionFailed: "Database connection failed.",
    verifyEmailFailed: "Error while sending verification email",
    provideFromEmail: "Sender email address not provided. Please provide it to send the email",
    registerUser: "Error occurred while registering user",
    userAlreadyExists: "User already exists with this email",
    usernameAlreadyTaken: "Username is already taken",
    userNotCreated: "User not created",
    userNotSaved: "User not saved",
    userNotFound: "We could not find a user with the provided credentials. Please check and try again.",
    userNotVerified: "Please verify your account before logging in",
    invalidCredentials: "Invalid credentials",
    incorrectPassword: "Incorrect password",
    checkUsername: "Error occurred while checking username availability",
    invalidQueryParams: "Invalid query parameters",
    methodNotAllowed: "HTTP request method Not Allowed",
    verifyUser: "Error occurred while verifying user",
    userAlreadyVerified: "User has already been verified",
    verifyCodeExpired: "The verification code you provided has expired. Please request a new verification code.",
    inCorrectVerifyCode: "The verification code you provided is incorrect. Please check and try again."
};




