import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { cartItems, products } = useContext(ShopContext);
  const navigate = useNavigate();

  let subtotal = 0;
  let delivery = 0;

  const getDeliveryFee = (price) => {
    if (price <= 350) return 0;
    if (price <= 1000) return 13;
    if (price <= 2000) return 23;
    if (price <= 3000) return 31;
    if (price <= 5000) return 40;
    return 49;
  };

  for (const itemId in cartItems) {
    const product = products.find((p) => p._id === itemId);
    if (!product) continue;

    // ✅ DELIVERY CHARGED ONCE PER PRODUCT
    delivery += getDeliveryFee(product.price);

    for (const size in cartItems[itemId]) {
      const qty = cartItems[itemId][size];
      subtotal += product.price * qty;
    }
  }

  const total = subtotal + delivery;

  return (
    <div className="p-5 mt-6 border rounded-xl bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Delivery Charges</span>
        <span>₹{delivery}</span>
      </div>

      <hr className="my-3" />

      <div className="flex flex-col sm:flex-row justify-between items-center text-lg font-bold gap-4">
        <Title text1="₹CART" text2="TOTAL" />
        <span className="ml-0 sm:ml-4">₹{total}</span>
      </div>

      <button
        onClick={() => navigate("/placeorder")}
        className="w-full mt-4 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotal;



// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "./Title";
// import { useNavigate } from "react-router-dom";

// const CartTotal = () => {
//   const { cartItems, products } = useContext(ShopContext);
//   const navigate = useNavigate();

//   let subtotal = 0;
//   let delivery = 0;

//   const getDeliveryFee = (price) => {
//     if (price <= 350) return 0;
//     if (price <= 1000) return 13;
//     if (price <= 2000) return 23;
//     if (price <= 3000) return 31;
//     if (price <= 5000) return 40;
//     return 49;
//   };

//   for (const itemId in cartItems) {
//     const product = products.find((p) => p._id === itemId);
//     if (!product) continue;

//     for (const size in cartItems[itemId]) {
//       const qty = cartItems[itemId][size];
//       subtotal += product.price * qty;
//       delivery += getDeliveryFee(product.price) * qty;
//     }
//   }

//   const total = subtotal + delivery;

//   return (
//     <div className="p-5 mt-6 border rounded-xl bg-white shadow-sm">
//       <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

//       <div className="flex justify-between mb-2">
//         <span>Subtotal</span>
//         <span>₹{subtotal}</span>
//       </div>

//       <div className="flex justify-between mb-2">
//         <span>Delivery Charges</span>
//         <span>₹{delivery}</span>
//       </div>

//       <hr className="my-3" />

//       <div className="flex flex-col sm:flex-row justify-between items-center text-lg font-bold gap-4">
//         <Title text1="₹CART" text2="TOTAL" />
//         <span className="ml-0 sm:ml-4">₹{total}</span>
//       </div>

//       <button
//         onClick={() => navigate("/placeorder")}
//         className="w-full mt-4 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all"
//       >
//         Proceed to Checkout
//       </button>
//     </div>
//   );
// };

// export default CartTotal;
