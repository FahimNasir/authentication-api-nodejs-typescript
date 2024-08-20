import { ApiResponseDto } from "../../dto/api-response.dto";
import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares/require-auth.middleware";
import { Order } from "../../models/Order";
import mongoose from "mongoose";

const router = express.Router();

router.get("/api/order/", requireAuth, async (req: Request, res: Response) => {
  try {
    // * Fetch all orders.
    // * const orders = await Order.find({});

    // * All orders with single relationship value i.e. product
    // * const orders = await Order.find({}).populate("product");

    // * All orders with multiple relationship values i.e. product and customer
    // const orders = await Order.find({}).populate([
    //   { path: "product" },
    //   { path: "customer" },
    // ]);

    // * All orders with selective fields of relationship collection.
    const orders = await Order.find({})
      .populate([{ path: "product", select: "name code" }])
      .select("orderNo amount");

    return res
      .status(200)
      .send(
        new ApiResponseDto(false, "Orders fetched successfully", orders, 200)
      );
  } catch (error) {
    console.error("Error occurred during list-order", error);
    return res
      .status(500)
      .send(
        new ApiResponseDto(
          true,
          "Something wen't wrong while list-order",
          [],
          500
        )
      );
  }
});

export { router as listOrderRouter };
