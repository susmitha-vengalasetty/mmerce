import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  /* ================= FETCH USER ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  /* ================= CANCEL ORDER ================= */
  const cancelOrder = async (orderId, itemId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId, itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Order cancelled");
        fetchOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Cancel failed");
    }
  };

  /* ================= DELIVERY CHARGE DISPLAY ================= */
  const getDeliveryCharge = (amount) => {
    if (amount < 300) return 0;
    if (amount < 500) return 3;
    if (amount < 1000) return 10;
    if (amount < 1500) return 15;
    if (amount < 2500) return 20;
    if (amount < 3000) return 25;
    if (amount < 4000) return 30;
    return 49;
  };

  return (
    <div className="px-6 pt-10">
      <Title text1="MY" text2="ORDERS" />

      {orders.length === 0 && (
        <p className="text-gray-500 mt-6">No orders found</p>
      )}

      {orders.map(order =>
        order.items
          .filter(item => item.status !== "Cancelled")
          .map(item => {
            const deliveryCharge = getDeliveryCharge(order.amount);
            const productTotal = order.amount - deliveryCharge;

            return (
              <div
                key={item._id}
                className="border rounded-xl p-4 my-6 flex gap-4 bg-white"
              >
                {/* IMAGE */}
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-24 h-24 object-contain bg-gray-100 rounded"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity} | Size: {item.size || "N/A"}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Order Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>


                  {/* PAYMENT METHOD */}
                  <p className="text-gray-500 text-sm mt-1">
                    Payment Method:{" "}
                    <span
                      className={`font-semibold ${
                        order.paymentMethod === "COD"
                          ? "text-orange-600"
                          : "text-green-700"
                      }`}
                    >
                      {order.paymentMethod}
                    </span>
                  </p>

                  {/* PAYMENT STATUS */}
                  <p className="text-gray-500 text-sm">
                    Payment Status:{" "}
                    <span
                      className={`font-semibold ${
                        order.payment ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {order.payment ? "Paid" : "Pending"}
                    </span>
                  </p>

                  {/* PRICE BREAKUP */}
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Product Total: {currency}{productTotal}</p>
                    <p>Delivery Charges: {currency}{deliveryCharge}</p>
                    <p className="font-semibold text-black">
                      Total Payable: {currency}{order.amount}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div className="mt-3 flex gap-4 text-sm flex-wrap">
                    {[
                      "Order Placed",
                      "Packing",
                      "Shipped",
                      "Out for delivery",
                      "Delivered",
                    ].map(step => (
                      <span
                        key={step}
                        className={`flex items-center gap-1 ${
                          step === item.status
                            ? "text-green-600 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        ● {step}
                      </span>
                    ))}
                  </div>

                  {/* CANCEL */}
                  {["Order Placed", "Packing"].includes(item.status) && !(order.payment && order.paymentMethod === "Razorpay") && (
                    <button
                      onClick={() => cancelOrder(order._id, item._id)}
                      className="mt-3 border px-4 py-1 rounded text-sm text-red-600 hover:bg-red-50"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            );
          })
      )}
    </div>
  );
};

export default Orders;
