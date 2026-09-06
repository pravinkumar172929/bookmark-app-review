import express from "express";
import { pool } from "./db";
const app = express();

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.listen(5001);
