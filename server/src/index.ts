import express from "express";
import "./db";
const app = express();

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.listen(5001);
