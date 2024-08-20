import { ApiResponseDto } from "../../dto/api-response.dto";
import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares/require-auth.middleware";
import { Order } from "../../models/Order";
import mongoose from "mongoose";
import { Product } from "../../models/Product";

const router = express.Router();

router.post("/api/order/", requireAuth, async (req: Request, res: Response) => {
  try {
    const { productId, amount } = req.body;

    // * Generate a unique order no
    const orderNo =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const product = await Product.findById(
      new mongoose.Types.ObjectId(productId)
    );

    if (!product) {
      return res
        .status(404)
        .send(
          new ApiResponseDto(
            true,
            "No product exists with provided information",
            [],
            404
          )
        );
    }

    const newOrder = await Order.create({
      orderNo,
      product: new mongoose.Types.ObjectId(productId),
      amount,
    });

    return res
      .status(201)
      .send(
        new ApiResponseDto(false, "Order created successfully", newOrder, 201)
      );
  } catch (error) {
    console.error("Error occurred during create-order", error);
    return res
      .status(500)
      .send(
        new ApiResponseDto(
          true,
          "Something wen't wrong while create-order",
          [],
          500
        )
      );
  }
});

export { router as createOrderRouter };
