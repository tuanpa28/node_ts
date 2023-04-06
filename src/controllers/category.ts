import Category from "../models/category";
import { Request, Response } from "express";
import { cateSchema } from "../schemas/category";

// Lấy tất cả danh mục
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().populate({
      path: "productId",
      select: "name",
    });

    if (categories.length === 0) {
      return res.status(404).json({ message: "Không có danh mục nào!" });
    }

    return res.json({
      message: "Lấy danh sách danh mục thành công!",
      categories,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Lấy danh mục theo id
export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id).populate({
      path: "productId",
      select: "name",
      populate: { path: "categoryId", select: "name" },
    });

    if (!category) {
      return res.status(404).json({ message: "Không có danh mục nào!" });
    }

    return res.json({
      message: "Lấy danh mục thành công!",
      category,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Thêm danh mục
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { error } = cateSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const category = await Category.create(req.body);

    if (!category) {
      return res.status(400).json({ message: "Thêm danh mục thất bại!" });
    }

    return res.json({ message: "Thêm danh mục thành công!", category });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Sửa danh mục
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { error } = cateSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      return res.status(400).json({ message: "Sửa danh thất mục bại!" });
    }

    return res.json({ message: "Sửa danh mục thành công!", category });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Xóa danh mục
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(400).json({ message: "Xóa danh mục thất bại!" });
    }

    return res.json({ message: "Xóa danh mục thành công!", category });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
