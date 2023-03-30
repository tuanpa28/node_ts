import { Router } from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router: Router = Router();

// Lấy tất cả sản phẩm
router.get("/products", getProducts);

// Lấy sản phẩm theo id
router.get("/product/:id", getProduct);

// Thêm sản phẩm
router.post("/product", checkPermission, addProduct);

// Sửa sản phẩm
router.put("/product/:id", checkPermission, editProduct);

// Xóa sản phẩm
router.delete("/product/:id", checkPermission, deleteProduct);

export default router;
