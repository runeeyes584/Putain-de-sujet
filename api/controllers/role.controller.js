import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const setUserRole = async (req, res) => {
  try {
    const { userId, roles } = req.body; // roles là mảng, ví dụ: ["seller", "buyer"]

    if (!userId || !Array.isArray(roles)) {
      return res.status(400).json({ error: "Thiếu userId hoặc roles không hợp lệ" });
    }

    const metadata = {
      isSeller: roles.includes("seller"),
      isBuyer: roles.includes("buyer"),
    };

    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: metadata
    });

    res.status(200).json({ message: "Cập nhật vai trò thành công" });
  } catch (error) {
    console.error("Lỗi cập nhật role:", error);
    res.status(500).json({ error: "Cập nhật thất bại" });
  }
};
