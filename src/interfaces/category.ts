import { ObjectId } from "mongoose";
interface ICategory {
  name: { type: string };
  productId: ObjectId;
}

export default ICategory;
