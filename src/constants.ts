import { config } from 'dotenv';
config();

export const HOST_URL = `${process.env.HOST}:${process.env.PORT}`;
