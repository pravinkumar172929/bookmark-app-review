import express from "express";
import { pool } from "./db";
import router from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.use("/api/auth", router);

app.listen(5001);
