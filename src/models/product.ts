import { Schema, model, Types, Model } from "mongoose";
import IProduct from "../interfaces/product";
import mongoosePaginate from "mongoose-paginate-v2";

interface IProductModel extends Model<IProduct> {
  paginate: any;
}

const Product = new Schema<IProduct>(
  {
    name: { type: String, required: true, text: true },
    price: { type: Number, required: true, min: 0 },
    image: [{ type: Object, required: true }],
    description: { type: String, required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

Product.index({ name: "text" }); // đăng ký chỉ mục văn bản
Product.plugin(mongoosePaginate);

export default model<IProduct, IProductModel>("Product", Product);
