import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        image: [String],
        status: {
          type: String,
          default: "Order Placed",
        },
      },
    ],

    address: Object,
    amount: Number,

    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay"],
    },

    payment: {
      type: Boolean,
      default: false,
    },

    // ✅ ADD THESE
    razorpayOrderId: String,
    razorpayPaymentId: String,

    status: {
      type: String,
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
