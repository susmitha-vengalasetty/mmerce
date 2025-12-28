import express from "express";
import {
  placeOrder,
  createRazorpayOrder,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
  cancelOrder,
} from "../controllers/orderController.js";

import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* USER */
router.post("/place", authUser, placeOrder);
router.post("/userorders", authUser, userOrders);

// ✅ RAZORPAY
router.post("/create-razorpay-order", authUser, createRazorpayOrder);
router.post("/place-order-razorpay", authUser, placeOrderRazorPay);

/* ADMIN */
router.post("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);
router.post("/cancel", authUser, cancelOrder);

export default router;
