import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  /* ================= FETCH ALL ORDERS (ADMIN) ================= */
  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log("Admin order fetch error", error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (orderId, itemId, status) => {
    try {
      await axios.post(
        backendUrl + "/api/order/status",
        { orderId, itemId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.log("Status update failed", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Order Page</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      {orders.map((order) =>
        order.items.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 mb-5 bg-white flex justify-between gap-6"
          >
            {/* LEFT SECTION */}
            <div className="flex gap-4">
              <img
                src={item.image?.[0]}
                alt={item.name}
                className="w-16 h-16 object-contain bg-gray-100 rounded"
              />

              <div className="text-sm">
                <p className="font-medium">{item.name}</p>

                <p className="text-gray-500">
                  Qty: {item.quantity}
                </p>

                <p className="text-gray-500 mt-1">
                  {order.address?.street}, <br />
                  {order.address?.city}, {order.address?.state},{" "}
                  {order.address?.country}, {order.address?.zipcode}
                </p>

                <p className="text-gray-500 mt-1">
                  {order.address?.phone}
                </p>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-col items-end justify-between">
              <div className="text-right text-sm">
                <p><b>Items:</b> {order.items.length}</p>
                <p className="font-semibold mt-1">₹{order.amount}</p>
                <p className="text-gray-500">
                  Method: {order.paymentMethod}
                </p>
                <p className="text-gray-500">
                  Payment: {order.payment ? "Done" : "Pending"}
                </p>
                <p className="text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <select
                value={item.status}
                onChange={(e) =>
                  updateStatus(order._id, item._id, e.target.value)
                }
                className="border px-3 py-1 rounded text-sm mt-3"
              >
                <option>Order Placed</option>
                <option>Packing</option>
                <option>Shipped</option>
                <option>Out for delivery</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
