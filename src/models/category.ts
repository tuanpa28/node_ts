import { Schema, model, Types, UpdateQuery } from "mongoose";
import ICategory from "../interfaces/category";
import IProduct from "../interfaces/product";
import Product from "./product";

const Category = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    productId: [{ type: Types.ObjectId, ref: "Product", required: true }],
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { versionKey: false, timestamps: true }
);

// Trước khi xóa category, cập nhật lại categoryId của các sản phẩm thuộc category này thành uncategory
Category.pre("findOneAndDelete", async function (next) {
  try {
    const filter = this.getFilter(); // Lấy điều kiện tìm kiếm hiện tại của truy vấn
    const categoryId = this.getQuery().$set?.categoryId; // Lấy giá trị mới của trường categoryId nếu có
    const update: UpdateQuery<IProduct> = {
      categoryId: categoryId ?? "64358528238011a5bbbf7370", // Cập nhật categoryId mới hoặc "uncategorized" nếu không có giá trị mới
    };

    const result = await Product.updateMany(
      {
        categoryId: filter._id, // Tìm các sản phẩm cùng categoryId
      },
      update // Cập nhật categoryId mới
    );
    console.log(`Updated ${result}`);

    next();
  } catch (err) {
    next(err);
  }
});

export default model<ICategory>("Category", Category);
