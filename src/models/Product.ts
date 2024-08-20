import mongoose, { ObjectId } from "mongoose";

interface IAccessory {
  name: string;
  code: string;
}

interface IProduct {
  name: string;
  code: string;
  price: number;
  availableQuantity: number;
  // * embedded relationship example
  tags: string[];
  accessories: IAccessory[];
  //   createdBy: ObjectId;
  //   updatedBy: ObjectId;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableQuantity: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    accessories: {
      type: Array,
      required: true,
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "appUser",
    // },
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

const Product = mongoose.model<IProduct>("product", productSchema, "product");

export { Product };
