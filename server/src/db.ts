import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: "../.env" });

console.log(process.env.DATABASE_NAME);

const pool = new Pool({
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.HOST,
  port: Number(process.env.PORT),
});
