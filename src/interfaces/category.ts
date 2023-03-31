import { ObjectId } from "mongoose";
interface ICategory {
  name: { type: string };
  productId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export default ICategory;
