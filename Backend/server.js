import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port =  4000;

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",   // Vite local
      "http://localhost:3000",   // React local
      "https://mmerce-fq7l.vercel.app/", // production frontend
      "https://mmerce-xdeh.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Routes
app.use("/api/user", userRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter); 

app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => {
  console.log("Server started on PORT : " + port);
});
