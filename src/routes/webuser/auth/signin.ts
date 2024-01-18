import express, { Request, Response } from "express";
import { AppUser } from "../../../models/AppUser";
import { ApiResponseDto } from "../../../dto/api-response.dto";
import { Password } from "../../../services/password";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../services/mailer";

const router = express.Router();

router.post("/api/users/signin", async (req: Request, res: Response) => {
  try {
    // * Fetch email and password from request body
    const { emailAddress, password } = req.body;

    // * Check if user exist for provided email.
    const existingUser = await AppUser.find({ emailAddress });

    // * If user does not exist, tell user to sign up first.
    if (!existingUser || existingUser.length === 0) {
      throw new Error(`No user found with email ${emailAddress}`);
    }

    // * If user exists, check if password is correct match
    const isPasswordCorrect = await Password.compare(
      existingUser[0].password,
      password
    );

    // * If password is incorrect, throw error for incorrect password.
    if (!isPasswordCorrect) {
      throw new Error("Incorrect Password provided");
    }

    // * Generate a JWT Token for User
    const token = jwt.sign(
      {
        fullName: existingUser[0].fullName,
        emailAddress,
        role: existingUser[0].role,
      },
      process.env.JWT_KEY
    );

    req.session.jwt = token;
    // * ===========================

    // * If password is correct, login user.
    const response = new ApiResponseDto(
      false,
      `User logged in successfully`,
      emailAddress,
      200
    );
    res.status(200).send(response);
  } catch (error) {
    const response = new ApiResponseDto(true, error.message, [], 500);
    console.error(error);
    res.status(500).send(response);
  }
});

export { router as signinRouter };
