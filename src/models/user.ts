import { Schema, model } from "mongoose";
import IUser from "../types/auth";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, minLength: 4, maxLength: 255 },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
