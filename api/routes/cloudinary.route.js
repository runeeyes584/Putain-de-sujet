import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Route upload ảnh
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Vui lòng chọn ảnh để upload' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'your-folder-name', // Thay đổi tên folder theo nhu cầu
        });

        // Xóa file tạm sau khi upload
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            imageUrl: result.secure_url,
            publicId: result.public_id
        });
    } catch (error) {
        console.error('Lỗi upload ảnh:', error);
        res.status(500).json({ message: 'Lỗi khi upload ảnh' });
    }
});

// Route xóa ảnh
router.delete('/delete/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;
        const result = await cloudinary.uploader.destroy(publicId);
        res.json({
            success: true,
            message: 'Xóa ảnh thành công',
            result
        });
    } catch (error) {
        console.error('Lỗi xóa ảnh:', error);
        res.status(500).json({ message: 'Lỗi khi xóa ảnh' });
    }
});

export default router;
