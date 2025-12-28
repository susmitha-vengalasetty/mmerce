import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'
import crypto from "crypto";


const razorpayInstance = new razorpay({
  key_id : process.env.RAZORPAY_KEY_ID,
  key_secret : process.env.RAZORPAY_KEY_SECRET,
})
/* ================= PLACE ORDER ================= */
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const updatedItems = items.map(item => ({
      ...item,
      status: "Order Placed",
    }));

    const newOrder = new orderModel({
      userId,
      items: updatedItems,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

/* ================= PLACEHOLDERS ================= */
/* ================= CREATE RAZORPAY ORDER ================= */
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

     
/* ================= PLACE ORDER - RAZORPAY ================= */
const placeOrderRazorPay = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      items,
      amount,
      address,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 🔐 VERIFY SIGNATURE
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ PAYMENT VERIFIED → SAVE ORDER
    const updatedItems = items.map(item => ({
      ...item,
      status: "Order Placed",
    }));

    const newOrder = new orderModel({
      userId,
      items: updatedItems,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: true,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      status: "Order Placed",
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


/* ================= ADMIN: ALL ORDERS ================= */
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ================= ADMIN UPDATE STATUS ================= */
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;

  const order = await orderModel.findById(orderId);
  if (!order) return res.json({ success: false });

  order.status = status;
  order.items.forEach(item => (item.status = status));

  await order.save();
  res.json({ success: true });
};

/* ================= USER CANCEL ITEM ================= */
const cancelOrder = async (req, res) => {
  try {
    const { orderId, itemId } = req.body;

    const order = await orderModel.findOne({
      _id: orderId,
      userId: req.userId,
    });

    // ✅ FIX 1: order safety check
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    const item = order.items.id(itemId);
    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    // ❌ Cannot cancel after shipped
    if (["Shipped", "Delivered"].includes(item.status)) {
      return res.json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    // ✅ Cancel item
    item.status = "Cancelled";

    // ✅ FIX 2: if all items cancelled → update order status
    const allCancelled = order.items.every(
      i => i.status === "Cancelled"
    );

    if (allCancelled) {
      order.status = "Cancelled";
    }

    await order.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: "Cancel failed" });
  }
};

/* ================= USER: MY ORDERS ================= */
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel
      .find({ userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export {
  placeOrder,
  createRazorpayOrder,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
  cancelOrder,
};
