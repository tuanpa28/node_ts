import { Router } from "express";
import multer from "multer";
import { uploadImage, updateImage, deleteImage } from "../controllers/upload";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/images/upload", upload.array("image", 5), uploadImage);
router.put("/images/:publicId", upload.array("image", 5), updateImage);
router.delete("/images/:publicId", deleteImage);

export default router;
