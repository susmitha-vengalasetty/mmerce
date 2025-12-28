import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, _id, image, name, price }) => {
  const productId = _id || id;
  const { currency } = useContext(ShopContext);

  // ✅ IMAGE SAFETY FIX
  const imageSrc =
    Array.isArray(image) ? image[0] : image || "/placeholder.png";

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${productId}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={imageSrc}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;



// // import React,{ useContext } from 'react'
// // import { ShopContext } from '../context/ShopContext'
// // import {Link} from 'react-router-dom';

// // const ProductItem = ({id,_id,image,name,price}) => {
// //   const productId = _id || id;

// // // console.log("IMAGE VALUE:", image);
// //     const {currency} = useContext(ShopContext);
// //   return (
// //     <Link className='text-gray-700 cursor-pointer' to={`/product/${productId}`}>
// //         <div className='overflow-hidden'>
// //            <img
// //   className="hover:scale-110 transition ease-in-out"
// //   src={image}
// //   alt={name}
// // />

// //         </div>
// //         <p className='pt-3 pb-1 text-sm'>{name}</p>
// //         <p className='text-sm font-medium'>{currency}{price}</p>
// //     </Link>
// //   )
// // }

// // export default ProductItem

// import React, { useContext } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { Link } from 'react-router-dom'

// const ProductItem = ({ id, _id, image, name, price }) => {
//   const productId = _id || id
//   const { currency } = useContext(ShopContext)

//   const imageSrc = Array.isArray(image) ? image[0] : image

//   return (
//     <Link className='text-gray-700 cursor-pointer' to={`/product/${productId}`}>
//       <div className='overflow-hidden'>
//         <img
//           className="hover:scale-110 transition ease-in-out"
//           src={imageSrc}
//           alt={name}
//         />
//       </div>
//       <p className='pt-3 pb-1 text-sm'>{name}</p>
//       <p className='text-sm font-medium'>{currency}{price}</p>
//     </Link>
//   )
// }

// export default ProductItem

