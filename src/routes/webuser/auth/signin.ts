import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signin", async (req: Request, res: Response) => {
  res.send("sign in");
});

export { router as signinRouter };
