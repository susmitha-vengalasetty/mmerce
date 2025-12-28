import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartItem = ({ item }) => {
  const { _id, name, price, image, quantity, size } = item;
  const { updateCartQty, deleteItemFromCart } = useContext(ShopContext);

  // ✅ IMAGE SAFETY FIX
  const imageSrc =
    Array.isArray(image) ? image[0] : image || "/placeholder.png";

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 border-t py-6">
      {/* IMAGE */}
      <img
        src={imageSrc}
        className="w-full sm:w-28 h-28 rounded-lg object-contain"
        alt={name}
      />

      {/* DETAILS */}
      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{name}</h2>

        {/* ✅ HIDE DEFAULT SIZE */}
        {size !== "default" && (
          <p className="text-sm text-gray-500">
            Size: <span className="font-medium text-black">{size}</span>
          </p>
        )}

        {/* QUANTITY CONTROLS */}
        <div className="flex items-center gap-2 sm:gap-4 mt-2">
          <button
            className="px-3 py-1 border rounded-md"
            onClick={() =>
              updateCartQty(_id, size, Math.max(1, quantity - 1))
            }
          >
            -
          </button>

          <span className="px-3">{quantity}</span>

          <button
            className="px-3 py-1 border rounded-md"
            onClick={() => updateCartQty(_id, size, quantity + 1)}
          >
            +
          </button>
        </div>

        {/* REMOVE BUTTON */}
        <button
          className="text-red-500 mt-2 text-sm"
          onClick={() => deleteItemFromCart(_id, size)}
        >
          Remove
        </button>
      </div>

      {/* PRICE */}
      <div className="text-right text-lg font-semibold mt-2 sm:mt-0">
        ₹{price * quantity}
      </div>
    </div>
  );
};

export default CartItem;



// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";

// const CartItem = ({ item }) => {
//   const { _id, name, price, image, quantity, size } = item;
//   const { updateCartQty, deleteItemFromCart } = useContext(ShopContext);

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 border-t py-6">
//       {/* IMAGE */}
//       <img
//         src={Array.isArray(image) ? image[0] : image}
//         className="w-full sm:w-28 h-28 rounded-lg object-contain"
//         alt={name}
//       />

//       {/* DETAILS */}
//       <div className="flex-1 flex flex-col gap-2">
//         <h2 className="text-lg font-semibold">{name}</h2>

//         {/* SIZE DISPLAY */}
//         <p className="text-sm text-gray-500">
//           Size: <span className="font-medium text-black">{size}</span>
//         </p>

//         {/* QUANTITY CONTROLS */}
//         <div className="flex items-center gap-2 sm:gap-4 mt-2">
//           <button
//             className="px-3 py-1 border rounded-md"
//             onClick={() =>
//               updateCartQty(_id, size, Math.max(1, quantity - 1))
//             }
//           >
//             -
//           </button>

//           <span className="px-3">{quantity}</span>

//           <button
//             className="px-3 py-1 border rounded-md"
//             onClick={() => updateCartQty(_id, size, quantity + 1)}
//           >
//             +
//           </button>
//         </div>

//         {/* REMOVE BUTTON */}
//         <button
//           className="text-red-500 mt-2 text-sm"
//           onClick={() => deleteItemFromCart(_id, size)}
//         >
//           Remove
//         </button>
//       </div>

//       {/* PRICE */}
//       <div className="text-right text-lg font-semibold mt-2 sm:mt-0">
//         ₹{price * quantity}
//       </div>
//     </div>
//   );
// };

// export default CartItem;
