// middleware/upload.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Untuk ESM, perlu menentukan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

// Filter untuk jenis file yang diizinkan
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'video/mp4', 'video/mpeg', 'video/avi', "image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type tidak diizinkan'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
