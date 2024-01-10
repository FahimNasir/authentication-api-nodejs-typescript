import express, { Request, Response } from "express";
import { AppUser } from "../../../models/AppUser";
import { ApiResponseDto } from "../../../dto/api-response.dto";
import { Password } from "../../../services/password";
import { ROLES } from "../../../common/enums";
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

    const hashedPassword = await Password.toHash(password);

    // * if user doesn't exist, create a new user
    const newUser = await AppUser.create({
      emailAddress,
      password: hashedPassword,
      isActive: true,
      isLoggedIn: false,
      role: ROLES.NORMAL,
      fullName,
    });

    const response = new ApiResponseDto(
      false,
      `User sign up successfully!`,
      newUser,
      201
    );
    res.status(201).send(response);
  } catch (error) {
    const response = new ApiResponseDto(
      true,
      "Something went wrong while sign up. Please try again later",
      [],
      500
    );
    console.error(error);
    res.status(500).send(response);
  }
});

export { router as signupRouter };
