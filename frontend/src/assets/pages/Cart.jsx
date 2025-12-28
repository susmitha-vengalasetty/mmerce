import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import CartItem from "../components/CartItem";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems } = useContext(ShopContext);

  const cartProducts = [];

  for (const itemId in cartItems) {
    const product = products.find((p) => p._id === itemId);
    if (!product) continue;

    for (const size in cartItems[itemId]) {
      cartProducts.push({
        ...product,
        size,
        quantity: cartItems[itemId][size],
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-center text-2xl font-semibold mb-6">Your Cart</h1>

      {cartProducts.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {cartProducts.map((item) => (
              <CartItem key={`${item._id}-${item.size}`} item={item} />
            ))}
          </div>

          <CartTotal />
        </div>
      )}
    </div>
  );
};

export default Cart;
