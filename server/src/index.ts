import express from "express";
import cors from "cors";
import router from "./routes/auth-routes";
import logger from "./logger";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.use("/api/auth", router);

app.listen(5001);

logger.info("Backend server started");
logger.info("This is an info message");
logger.warn("This is a warning");
logger.error("This is an error");
logger.debug("This is a debug message");
