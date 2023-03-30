import Product from "../models/product";
import { proSchema } from "../schemas/product";
import { Request, Response } from "express";

// Lấy tất cả sản phẩm
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    if (products.length === 0)
      return res.status(404).json({ message: "Không có sản phẩm nào!" });

    return res.json({
      message: "Lấy danh sách sản phẩm thành công!",
      products,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Lấy sản phẩm theo id
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.json({ message: "Không tìm thấy sản phẩm!" });

    return res.json({
      message: "Lấy sản phẩm thành công!",
      product,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Thêm sản phẩm
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { error } = proSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const product = await Product.create(req.body);

    if (!product) return res.json({ message: "Thêm sản phẩm thất bại!" });

    return res.json({ message: "Thêm sản phẩm thành công!", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Sửa sản phẩm
export const editProduct = async (req: Request, res: Response) => {
  try {
    const { error } = proSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) return res.json({ message: "Sửa sản phẩm thất bại!" });

    return res.json({ message: "Sửa sản phẩm thành công!", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    return res.json({ message: "Xóa sản phẩm thành công!", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
