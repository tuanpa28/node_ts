import { ObjectId } from "mongoose";
interface IProduct {
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: ObjectId;
}
export default IProduct;
