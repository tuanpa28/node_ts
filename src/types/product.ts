interface IProduct {
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export default IProduct;
