import express from "express";
import cors from "cors";
import router from "./routes/auth-routes";
import pinoHttp from "pino-http";
import session from "express-session";
import bookmarkRouter from "./routes/bookmark-routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(pinoHttp());
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.use("/api/auth", router);

app.use("/api/bookmarks", bookmarkRouter);

app.listen(5001);
