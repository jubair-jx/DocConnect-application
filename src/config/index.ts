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
};
