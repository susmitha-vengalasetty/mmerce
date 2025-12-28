import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        if (!name || !description || !price || !category || !subCategory) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const validPrice = Number(price);
        if (isNaN(validPrice) || validPrice < 0) {
            return res.status(400).json({ success: false, message: "Price must be positive" });
        }

        // Handle sizes
        let safeSizes = [];
        if (sizes) {
            if (typeof sizes === "string") {
                safeSizes = sizes.includes("[") ? JSON.parse(sizes) : sizes.split(",").map(s => s.trim());
            } else if (Array.isArray(sizes)) safeSizes = sizes;
        }

        // ✅ Get Cloudinary URLs directly from multer
        const imagesUrl = [
            req.files?.image1?.[0]?.path,
            req.files?.image2?.[0]?.path,
            req.files?.image3?.[0]?.path,
            req.files?.image4?.[0]?.path,
        ].filter(Boolean);

        const product = await productModel.create({
            name,
            description,
            price: validPrice,
            category,
            subCategory,
            bestseller: bestseller === "true",
            sizes: safeSizes,
            image: imagesUrl,
            date: Date.now(),
        });

        res.status(201).json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.productId);
        res.json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProducts, removeProduct, singleProduct };
