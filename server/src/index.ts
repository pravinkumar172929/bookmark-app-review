import express from "express";
import cors from "cors";
import router from "./routes/auth-routes";
import pinoHttp from "pino-http";

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.use("/api/auth", router);

app.listen(5001);
