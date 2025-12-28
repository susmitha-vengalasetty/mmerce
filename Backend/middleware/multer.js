// multer.js – ready for Vercel with Cloudinary
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// 1️⃣ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2️⃣ Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce_uploads", // folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // allowed file types
    transformation: [{ width: 800, height: 800, crop: "limit" }], // optional resizing
  },
});

// 3️⃣ Initialize multer with Cloudinary storage
const upload = multer({ storage });

export default upload;
