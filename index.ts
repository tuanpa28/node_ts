import express from "express";
import productRouter from "./src/routers/product";
import authRouter from "./src/routers/auth";
import connectDB from "./src/config/database";
import CategoryRouter from "./src/routers/category";
import uploadRouter from "./src/routers/upload";
import dotenv from "dotenv";
// import cors from "cors";

const app = express();
dotenv.config();

// Khởi tạo kết nối tới cơ sở dữ liệu
connectDB(process.env.MONGO_URL! || "");

// Đăng ký một middleware giải mã dữ liệu json
app.use(express.json());

// app.use(cors());
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", CategoryRouter);
app.use("/api", uploadRouter);

export const viteNodeApp = app;
