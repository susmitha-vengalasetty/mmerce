import userModel from "../models/userModel.js";

// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    // 🔑 size handling
    const selectedSize = size || "default";

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][selectedSize] =
      (cartData[itemId][selectedSize] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// UPDATE CART
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems } = req.body;

    if (!cartItems) {
      return res.json({ success: false, message: "No cart data" });
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData: cartItems,
    });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      cartData: userData.cartData || {}
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };




// import userModel from "../models/userModel.js";

// // add products to user cart
// const addToCart = async (req,res) =>{
//     try{
//         const { userId, itemId, size } = req.body

//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         if(cartData[itemId]) {
//             if(cartData[itemId][size]){
//                 cartData[itemId][size] += 1
//             }
//             else{
//                 cartData[itemId][size] = 1
//             }
//         }
//         else{
//             cartData[itemId] = {}
//             cartData[itemId][size] = 1
//         }
        
//         await userModel.findByIdAndUpdate(userId, {cartData})

//         res.json({success: true, message: "Added to Cart"})
//     }
//     catch(error){
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }


// // update user cart
// const updateCart = async (req,res) =>{
//     try{
        
//         const { userId ,itemId, size, quantity } = req.body

//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;
//         cartData[itemId][size] = quantity
        
//         await userModel.findByIdAndUpdate(userId, {cartData})
//         res.json({ success: true, message: "Cart Updated" })
//     }
//     catch(error){
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// // get user cart data
// const getUserCart = async (req,res) =>{
//     try{
//         const { userId } = req.body

//         const userData = await userModel.findById(userId)
//         let cartData = await userData.cartData;

//         res.json({ success: true, cartData })
//     }
//     catch(error){
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }

// }

// export { addToCart, updateCart, getUserCart }