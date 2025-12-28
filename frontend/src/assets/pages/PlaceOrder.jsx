import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import stripe_logo from "../../assets/stripe_logo.jpeg";
import razorpay_logo from "../../assets/razorpay_logo.jpeg";
import { ShopContext } from "../context/ShopContext";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartTotal,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  /* ===================== RAZORPAY ===================== */
  const handleRazorpayPayment = async (orderData) => {
    try {
      const cartTotal = orderData.amount;

      // 1️⃣ CREATE RAZORPAY ORDER (BACKEND)
      const { data } = await axios.post(
        `${backendUrl}/api/order/create-razorpay-order`,
        { amount: cartTotal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        toast.error("Unable to initiate payment");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "WOW Store",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          // 2️⃣ VERIFY PAYMENT & PLACE ORDER
          const verifyRes = await axios.post(
            `${backendUrl}/api/order/place-order-razorpay`,
            {
              items: orderData.items,
              amount: cartTotal,
              address: orderData.address,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyRes.data.success) {
            toast.success("Payment successful 🎉");
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#000000",
        },
      };

      // 3️⃣ OPEN RAZORPAY CHECKOUT
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Razorpay payment failed");
    }
  };

  /* ===================== FORM HANDLERS ===================== */
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const product = products.find((p) => p._id === productId);

            if (product) {
              orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                size,
                quantity: cartItems[productId][size],
                status: "Order Placed",
                date: Date.now(),
              });
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotal() + delivery_fee,
      };

      // ================= COD =================
      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success("Order placed successfully 🎉");
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      }

      // ================= RAZORPAY =================
      if (method === "razorpay") {
        handleRazorpayPayment(orderData);
      }
    } catch (error) {
      console.error(error);
      toast.error("Order failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* LEFT */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} className="border p-2 w-full" placeholder="First name" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} className="border p-2 w-full" placeholder="Last name" />
        </div>

        <input required name="email" value={formData.email} onChange={onChangeHandler} className="border p-2 w-full" placeholder="Email" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} className="border p-2 w-full" placeholder="Street" />

        <div className="flex gap-3">
          <input required name="city" value={formData.city} onChange={onChangeHandler} className="border p-2 w-full" placeholder="City" />
          <input required name="state" value={formData.state} onChange={onChangeHandler} className="border p-2 w-full" placeholder="State" />
        </div>

        <div className="flex gap-3">
          <input required name="zipcode" value={formData.zipcode} onChange={onChangeHandler} className="border p-2 w-full" placeholder="Zipcode" />
          <input required name="country" value={formData.country} onChange={onChangeHandler} className="border p-2 w-full" placeholder="Country" />
        </div>

        <input required name="phone" value={formData.phone} onChange={onChangeHandler} className="border p-2 w-full" placeholder="Phone" />
      </div>

      {/* RIGHT */}
      <div className="mt-8 w-full max-w-[400px]">
        <CartTotal />

        <div className="mt-10">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-4 mt-4">
            <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border p-2 rounded cursor-pointer">
              <p className={`w-3 h-3 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`} />
              <img className="h-7" src={razorpay_logo} alt="Razorpay" />
            </div>

            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 rounded cursor-pointer">
              <p className={`w-3 h-3 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`} />
              <p className="text-sm">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
