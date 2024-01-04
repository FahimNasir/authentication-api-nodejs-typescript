import mongoose from "mongoose";

interface IAppUser {
  fullName: string;
  email: string;
  isActive: boolean;
  isLoggedIn: boolean;
  mobileNo: string;
  role: string;
}

const appUserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    mobileNo: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const AppUser = mongoose.model<IAppUser>("appUser", appUserSchema, "appUser");

export { AppUser };
