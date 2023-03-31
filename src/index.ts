import express from "express";
import productRouter from "./routers/product";
import authRouter from "./routers/auth";
import connectDB from "./config/database";
import CategoryRouter from "./routers/category";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

// Khởi tạo kết nối tới cơ sở dữ liệu
connectDB(process.env.MONGO_URL! || "");

// Đăng ký một middleware giải mã dữ liệu json
app.use(express.json());

app.use(cors());
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", CategoryRouter);

export const viteNodeApp = app;
