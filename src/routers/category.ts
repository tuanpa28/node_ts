import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router: Router = Router();

// Lấy tất cả danh mục
router.get("/categories", getCategories);

// Lấy danh mục theo id
router.get("/category/:id", getCategory);

// Thêm danh mục
router.post("/category", checkPermission, createCategory);

// Sửa danh mục
router.put("/category/:id", checkPermission, updateCategory);

// Xóa danh mục
router.delete("/category/:id", checkPermission, deleteCategory);

export default router;
