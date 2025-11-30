import { AppUser } from "../../models/AppUser";
import { ApiResponseDto } from "../../dto/api-response.dto";
import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares/require-auth.middleware";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signout",
  requireAuth,
  async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send(new ApiResponseDto(true, "No token provided", [], 401));
    }

    const decoded = jwt.decode(token);
    const emailAddress = (decoded as any)?.emailAddress;

    if (!emailAddress) {
      return res
        .status(401)
        .send(new ApiResponseDto(true, "Invalid token", [], 401));
    }

    const loggedInUser = await AppUser.find({ emailAddress });

    if (loggedInUser && loggedInUser.length > 0) {
      await AppUser.findByIdAndUpdate(loggedInUser[0]._id, {
        isLoggedIn: false,
      });
    }
    res.status(200).send(new ApiResponseDto(false, "Logout Success", [], 200));
  }
);

export { router as signoutRouter };
