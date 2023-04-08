import dotenv from "dotenv";
import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import IUser from "../interfaces/auth";
dotenv.config();
interface IRequestWithUser extends Request {
  user: IUser;
}

export const checkPermission = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    // Kiểm tra có thông tin token không
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Bạn phải đăng nhập để thực hiện hành động này!",
      });
    }

    // Lấy mã token
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, async (error, payload) => {
      if (error) {
        if (error.name === "JsonWebTokenError") {
          return res.status(401).json({ message: "Token không hợp lệ!" });
        }
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token đã hết hạn!" });
        }
      }

      // Tìm user từ id
      const { _id } = payload as JwtPayload;
      const user = (await User.findById(_id)) as IUser;
      if (!user) {
        return res.status(401).json({
          message: "Tài khoản không hợp lệ!",
        });
      }
      // Kiểm tra xem user có phải admin hay không
      if (user && user.role !== "admin") {
        return res.status(401).json({
          message: "Bạn không có quyền thực hiện chức năng này!",
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

// Bước 1: kiểm tra thông tin token gửi có không? Nếu không có thì thông báo cần phải đăng nhập
// Bước 2: Lấy token bằng cách chuyển từ chuỗi sang mảng và lấy phần tử thứ 2
// Bước 3: Kiểm tra token có hợp lệ không? Nếu không hợp lệ thì thông báo cần phải đăng nhập
// Bước 4: Giải mã token và lấy ID, kiểm tra ID tồn tại trong db không?
// Bước 5: Kiểm tra quyền của user có phải là admin không? Nếu không phải thì thông báo không có quyền truy cập tài nguyên
// Bước 6: Nếu hợp lệ thì cho phép truy cập tài nguyên
// Bước 7: Gắn middleware vào router nào cần check quyền
