import { ObjectId } from "mongoose";
interface IProduct {
  name: string;
  price: number;
  image: object[];
  description: string;
  categoryId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
export default IProduct;
