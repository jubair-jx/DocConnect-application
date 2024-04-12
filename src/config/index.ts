import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_token_key: process.env.REFRESH_TOKEN_KEY,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_pass_token_key: process.env.RESET_PASS_TOKEN_KEY,
    reset_pass_token_expires_in: process.env.RESET_PASS_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  sendEmail: {
    email: process.env.EMAIL,
    email_key: process.env.EMAIL_KEY,
  },
  ssl: {
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASS,
    payment_api: process.env.SSL_PAYMENT_API_KEY,
    success_url: process.env.SUCCESS_URL,
    failed_url: process.env.FAILURE_URL,
    validation_api: process.env.SSL_VALIDATION_API,
    cancelled_url: process.env.CANCELLED_URL,
  },
};
