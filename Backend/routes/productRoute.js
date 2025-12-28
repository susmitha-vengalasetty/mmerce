import express from "express";
import {
    addProduct,
    listProducts,
    removeProduct,
    singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
    "/add",
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]),
    (req, res, next) => {
        // Collect URLs from multer Cloudinary upload
        const images = [];
        for (const key in req.files) {
            if (req.files[key].length > 0) {
                images.push(req.files[key][0].path); // URL from Cloudinary
            }
        }
        req.body.images = images; // pass to controller
        next();
    },
    addProduct
);

productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.post("/list", listProducts);

export default productRouter;
