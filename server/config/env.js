import { config } from 'dotenv';

// Load environment variables from .env.development.local
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

console.log(process.env.NODE_ENV);
export const {PORT,NODE_ENV,MONGO_URI,JWT_SECRET,JWT_EXPIRE,ARCJET_ENV,ARCJET_KEY,CLOUDINARY_CLOUD_NAME,CLOUDINARY_URL,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER,} = process.env;
