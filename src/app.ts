import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";
import { signupRouter } from "./routes/auth/signup";
import { changePasswordRouter } from "./routes/auth/change-password";
import { forgotPasswordRouter } from "./routes/auth/forgot-password";
import { verifyForgotPasswordTokenRouter } from "./routes/auth/verify-forgot-pass-token";
import { newPasswordRouter } from "./routes/auth/new-password";
import cors, { CorsOptions } from "cors";
import { githubCallbackRouter } from "./routes/auth/github-callback";

const dotenv = require("dotenv").config();

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "development",
    name: "auth-app-session",
  })
);

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(signupRouter);
app.use(signinRouter);
app.use(changePasswordRouter);
app.use(signoutRouter);
app.use(githubCallbackRouter);
app.use(forgotPasswordRouter);
app.use(verifyForgotPasswordTokenRouter);
app.use(newPasswordRouter);

app.use("/", async (req, res) => {
  res.send("Auth API Working...");
});

app.all("*", async (req, res, next) => {
  throw new Error("Route not found");
});

export { app };
