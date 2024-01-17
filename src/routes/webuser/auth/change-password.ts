import { ApiResponseDto } from "../../../dto/api-response.dto";
import express, { Request, Response } from "express";
import { requireAuth } from "../../../middlewares/require-auth.middleware";
import { AppUser } from "../../../models/AppUser";
import { Password } from "../../../services/password";

const router = express.Router();

router.post(
  "/api/users/change-password",
  requireAuth,
  async (req: Request, res: Response) => {
    const { emailAddress } = req.session?.user;
    const { newPassword } = req.body;

    // * Fetch user from database for email address.
    const existingUser = await AppUser.find({ emailAddress, isLoggedIn: true });

    if (!existingUser && existingUser.length === 0) {
      res
        .status(400)
        .send(
          new ApiResponseDto(
            true,
            `No user found with emailAddress ${emailAddress}`,
            [],
            400
          )
        );
    }

    // * Password validations
    // * 1 New and old password should be different
    // * 2 Password complexity 4 char, 5 number.
    // * 3 Password length should be greater than 8

    // * Change User's password with provided password.
    const newHashedPassword = await Password.toHash(newPassword);

    const updatedUser = await AppUser.updateOne(
      { emailAddress },
      { password: newHashedPassword },
      { new: true }
    );

    // * Return response.
    res
      .status(200)
      .send(
        new ApiResponseDto(false, "Change Password Success", updatedUser, 200)
      );
  }
);

export { router as changePasswordRouter };
