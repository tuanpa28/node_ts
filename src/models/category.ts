import { Schema, model, Types } from "mongoose";
import ICategory from "../interfaces/category";

const Category = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    productId: [{ type: Types.ObjectId, ref: "Product", required: true }],
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

export default model<ICategory>("Category", Category);