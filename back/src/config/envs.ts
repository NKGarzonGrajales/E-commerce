import dotenv from "dotenv";
import { get } from "http";
dotenv.config();

const getRequiredEnv = (name: string): string => {
    const value = process.env[name]; 
    
    if(!value){
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}; 

export const PORT: number = Number(process.env.PORT) || 3000;

export const DB_NAME: string = getRequiredEnv("DB_NAME");
export const DB_USER: string = getRequiredEnv("DB_USER");
export const DB_PASSWORD: string = getRequiredEnv("DB_PASSWORD");
export const DB_HOST: string = getRequiredEnv("DB_HOST");
export const DB_PORT: number = Number(getRequiredEnv("DB_PORT"));
export const JWT_SECRET: string = getRequiredEnv("JWT_SECRET");
