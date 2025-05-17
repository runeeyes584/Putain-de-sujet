import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
dotenv.config();

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const setUserRole = async (req, res) => {
  try {
    const { userId, roles } = req.body;

    if (!userId || !Array.isArray(roles)) {
      return res.status(400).json({ error: "Thiếu userId hoặc roles không hợp lệ" });
    }

    // Cập nhật trạng thái vai trò rõ ràng: true nếu được chọn, false nếu không
    const newMetadata = {
      isSeller: roles.includes("seller"),
      isBuyer: roles.includes("buyer"),
    };

    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: newMetadata
    });

    res.status(200).json({ message: "Cập nhật vai trò thành công" });
  } catch (error) {
    console.error("Lỗi cập nhật role:", error);
    res.status(500).json({ error: "Cập nhật thất bại" });
  }
};
