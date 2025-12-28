import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    setToken("");
    setUser(null);
    setCartItems({});
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  /* ---------------- AUTH HEADER ---------------- */
  const authHeader = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  /* ---------------- USER PROFILE ---------------- */
  const getUserProfile = async () => {
    if (!token) {
      setUser(false);
      return;
    }

    try {
      const res = await axios.get(
        `${backendUrl}/api/user/profile`,
        { headers: authHeader }
      );

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(false);
      }
    } catch (error) {
      console.log(error);
      setUser(false);
    }
  };

  /* ---------------- PRODUCTS ---------------- */
  const getProductData = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- NORMALIZE CART ---------------- */
  const normalizeCart = (cartData) => {
    const normalized = {};
    for (const itemId in cartData) {
      normalized[itemId] = {};
      const sizeData = cartData[itemId];

      if (!Array.isArray(sizeData)) {
        for (const size in sizeData) {
          normalized[itemId][size] = Number(sizeData[size]) || 1;
        }
      } else {
        sizeData.forEach((size) => {
          normalized[itemId][size] =
            (normalized[itemId][size] || 0) + 1;
        });
      }
    }
    return normalized;
  };

  /* ---------------- GET USER CART ---------------- */
  const getUserCart = async () => {
    if (!token) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: authHeader }
      );

      if (res.data.success) {
        setCartItems(normalizeCart(res.data.cartData || {}));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select size");
      return;
    }

    setCartItems((prev) => {
      const updated = { ...prev };
      if (!updated[itemId]) updated[itemId] = {};
      updated[itemId][size] = (updated[itemId][size] || 0) + 1;
      return updated;
    });

    if (token) {
      await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: authHeader }
      );
    }
  };

  /* ---------------- UPDATE CART QTY ---------------- */
  const updateCartQty = async (itemId, size, qty) => {
  let updatedCart = structuredClone(cartItems);

  if (!updatedCart[itemId]) return;

  if (qty <= 0) {
    delete updatedCart[itemId][size];
  } else {
    updatedCart[itemId][size] = qty;
  }

  if (Object.keys(updatedCart[itemId]).length === 0) {
    delete updatedCart[itemId];
  }

  setCartItems(updatedCart);

  // ✅ ALWAYS send full cart
  if (token) {
    try {
      await axios.post(
        `${backendUrl}/api/cart/update`,
        { cartItems: updatedCart },
        { headers: authHeader }
      );
    } catch (err) {
      console.error("Cart update failed", err);
    }
  }
};

  /* ---------------- REMOVE ITEM (USING UPDATE API) ---------------- */
  const deleteItemFromCart = async (itemId, size) => {
  let updatedCart = structuredClone(cartItems);

  if (updatedCart[itemId] && updatedCart[itemId][size]) {
    delete updatedCart[itemId][size];
  }

  if (updatedCart[itemId] && Object.keys(updatedCart[itemId]).length === 0) {
    delete updatedCart[itemId];
  }

  setCartItems(updatedCart);

  // 🔥 Send FULL updated cart to backend
  if (token) {
    await axios.post(
      `${backendUrl}/api/cart/update`,
      { cartItems: updatedCart },
      { headers: authHeader }
    );
  }
};

  /* ---------------- TOTALS ---------------- */
  const getCartCount = () =>
    Object.values(cartItems).reduce(
      (sum, sizes) =>
        sum + Object.values(sizes).reduce((a, b) => a + b, 0),
      0
    );

  const getCartTotal = () =>
    Object.entries(cartItems).reduce((total, [id, sizes]) => {
      const product = products.find((p) => p._id === id);
      if (!product) return total;

      return (
        total +
        Object.values(sizes).reduce(
          (sum, qty) => sum + product.price * qty,
          0
        )
      );
    }, 0);

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    getUserProfile();
    getUserCart();
  }, [token]);

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        updateCartQty,
        deleteItemFromCart,
        getCartCount,
        getCartTotal,
        token,
        setToken,
        user,
        navigate,
        logout,
        backendUrl,
        setCartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
