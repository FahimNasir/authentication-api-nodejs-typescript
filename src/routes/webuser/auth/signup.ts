import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signup", async (req: Request, res: Response) => {
  res.send("sign up");
});

export { router as signupRouter };
