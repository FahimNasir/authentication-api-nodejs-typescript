import express, { Request, Response } from "express";
import { AppUser } from "../../../models/AppUser";
const router = express.Router();

router.post("/api/users/signup", async (req: Request, res: Response) => {
  try {
    const { emailAddress, password, fullName } = req.body;

    // * Check if user already exist.
    const existingUser = await AppUser.find({ emailAddress });

    // * If user already exists, throw error.
    if (existingUser && existingUser.length > 0) {
      throw new Error(`User already exists with email: ${emailAddress}`);
    }

    // * if user doesn't exist, create a new user
    const newUser = await AppUser.create({
      emailAddress,
      password,
      isActive: true,
      isLoggedIn: false,
      role: "NORMAL",
      fullName,
    });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export { router as signupRouter };
