import { ApiResponseDto } from "../../dto/api-response.dto";
import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares/require-auth.middleware";
import { Product } from "../../models/Product";

const router = express.Router();

router.get(
  "/api/product/",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      //* Param = code
      // * Get the query params.
      // * create the filter according to the params, if passed.
      // * Pass the filter object to Product.find query.
      const {code} = req.query
      const products = code ? await Product.find({code: code}) : await Product.find();
      return res
        .status(200)
        .send(
          new ApiResponseDto(
            false,
            "Products fetched successfully",
            products,
            200
          )
        );
    } catch (error) {
      console.error("Error occurred during change-password", error);
      return res
        .status(500)
        .send(
          new ApiResponseDto(
            true,
            "Something wen't wrong while change password",
            [],
            500
          )
        );
    }
  }
);

export { router as productListRouter };
