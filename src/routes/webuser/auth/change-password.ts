import { ApiResponseDto } from "../../../dto/api-response.dto";
import express, { Request, Response } from "express";
import { requireAuth } from "../../../middlewares/require-auth.middleware";

const router = express.Router();

router.post(
  "/api/users/change-password",
  requireAuth,
  (req: Request, res: Response) => {
    console.log("Logged In user is: ", req.session?.user.emailAddress);

    // * Fetch user from database for email address.

    // * Change User's password with provided password.

    // * Return response.
    res
      .status(200)
      .send(new ApiResponseDto(false, "Change Password Success", [], 200));
  }
);

export { router as changePasswordRouter };
