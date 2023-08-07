import dotenv from 'dotenv';

dotenv.config();

export const dbUri = process.env.POSTGRES_URI;
export const serverPort = process.env.PORT;
