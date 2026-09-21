import express from "express";
import cors from "cors";
import router from "./routes/auth-routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.use("/api/auth", router);

app.listen(5001);
