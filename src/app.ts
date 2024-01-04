import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { signinRouter } from "./routes/webuser/auth/signin";
import { signoutRouter } from "./routes/webuser/auth/signout";
import { signupRouter } from "./routes/webuser/auth/signup";

const dotenv = require("dotenv").config();

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "development",
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res, next) => {
  throw new Error("Route not found");
});

export { app };
