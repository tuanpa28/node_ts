import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category";

const router: Router = Router();

// Lấy tất cả danh mục
router.get("/categories", getCategories);

// Lấy danh mục theo id
router.get("/category/:id", getCategory);

// Thêm danh mục
router.post("/category", createCategory);

// Sửa danh mục
router.put("/category/:id", updateCategory);

// Xóa danh mục
router.delete("/category/:id", deleteCategory);

export default router;
