import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signin", async (req: Request, res: Response) => {
  // * Fetch email and password from request body
  const { emailAddress, password } = req.body;

  // * Check if user exist for provided email.

  // * If user exists, check if password is correct match

  // * If user does not exist, tell user to sign up first.

  // * If password is correct, login user.

  // * If password is incorrect, throw error for incorrect password.

  // * return the response.
  res.send("sign in");
});

export { router as signinRouter };
