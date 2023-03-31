import { Schema, model } from "mongoose";
import IUser from "../interfaces/auth";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, minLength: 4, maxLength: 255 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "member",
    },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true, versionKey: false }
);

export default model<IUser>("User", userSchema);
