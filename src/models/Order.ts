import mongoose, { ObjectId } from "mongoose";

interface IOrder {
  orderNo: string;
  product: ObjectId;
  amount: number;
}

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
    orderNo: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt (DateTime)
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Order = mongoose.model<IOrder>("order", orderSchema, "order");

export { Order };
