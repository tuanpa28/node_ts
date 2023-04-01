import { Schema, model, Types } from "mongoose";
import IProduct from "../interfaces/product";

const Product = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

export default model<IProduct>("Product", Product);
