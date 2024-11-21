import dotenv from 'dotenv';
dotenv.config();

export default {
    APP_PORT: process.env.SERVER_PORT,
    API_KEY: process.env.SERVER_API_KEY,
    SECRET_KEY_SIGNATURE: process.env.SECRET_KEY_SIGNATURE,
    SECRET_KEY_ENCRYPTION: process.env.SECRET_KEY_ENCRYPTION,
    SECRET_KEY_TOTP: process.env.SECRET_KEY_TOTP,
    TRIGGER_INSUFFICIENT_BALANCE_AMOUNT: Number(process.env.TRIGGER_INSUFFICIENT_BALANCE_AMOUNT),
    TRIGGER_PAYMENT_ALREADY_PAID: Number(process.env.TRIGGER_PAYMENT_ALREADY_PAID),
    CSRF_CACHE_EXPIRY_IN_SEC: Number(process.env.CSRF_CACHE_EXPIRY_IN_SEC),
    DEFAULT_PIN: process.env.DEFAULT_PIN,
    isDynamicTOTPSecretKey: process.env.USING_DYNAMIC_SECRET_KEY_TOTP === "true",
    LIMIT_STORED_CSRF: Number(process.env.LIMIT_STORED_CSRF),
}
