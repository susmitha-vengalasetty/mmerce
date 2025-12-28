import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

import star_icon from "../../assets/star_icon.jpeg";
import star_dull_icon from "../../assets/star_dull_icon.jpeg";
import RelatedProduct from "../components/RelatedProduct";
import { toast } from "react-toastify";

const currency = "₹";

const Product = () => {
  const { id: productId } = useParams();
  const { products, addToCart } = useContext(ShopContext) || { products: [], addToCart: () => {} };

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const resolveImg = (img) => {
    if (!img) return "";
    if (typeof img === "string") return img;
    if (typeof img === "object" && img.default) return img.default;
    return String(img);
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      setProductData(null);
      setImage("");
      return;
    }

    const product = products.find(
      (item) =>
        String(item._id) === String(productId) ||
        String(item.id) === String(productId)
    );

    if (!product) {
      setProductData(null);
      setImage("");
      return;
    }

    setProductData(product);

    let imgs = [];
    if (Array.isArray(product.image)) {
      imgs = product.image.map(resolveImg).filter(Boolean);
    } else if (product.image) {
      imgs = [resolveImg(product.image)].filter(Boolean);
    }

    setImage(imgs[0] || "");

    // ✅ Reset selected size when switching products
    setSelectedSize("");

  }, [productId, products]);

  if (!productData) {
    return <div className="pt-10 text-center opacity-50">Loading product...</div>;
  }

  const thumbnails =
    Array.isArray(productData.image)
      ? productData.image.map(resolveImg).filter(Boolean)
      : image
      ? [image]
      : [];

  const handleAddToCart = () => {
    if (productData.sizes && productData.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size!", { position: "top-center" });
      return;
    }

    const sizeToSend =
      productData.sizes && productData.sizes.length > 0 ? selectedSize : "default";

    addToCart(productData._id, sizeToSend);
  };

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* LEFT */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18%] w-full gap-3">
            {thumbnails.length > 0 ? (
              thumbnails.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  onClick={() => imgUrl && setImage(imgUrl)}
                  className="w-[24%] sm:w-full sm:mb-3 cursor-pointer border rounded object-contain"
                  alt={`thumb-${index}`}
                />
              ))
            ) : (
              <p className="text-gray-500">No images found</p>
            )}
          </div>

          <div className="w-full sm:w-[80%] flex items-center justify-center">
            {image ? (
              <img
                src={image}
                className="w-full h-auto rounded object-contain"
                alt="product"
              />
            ) : (
              <p className="text-gray-500">No main image available</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <img src={star_icon} className="w-3.5" alt="star" />
            <img src={star_icon} className="w-3.5" alt="star" />
            <img src={star_icon} className="w-3.5" alt="star" />
            <img src={star_icon} className="w-3.5" alt="star" />
            <img src={star_dull_icon} className="w-3.5" alt="star" />
            <p className="pl-2">122</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-600 md:w-4/5 leading-relaxed">
            {productData.description}
          </p>

          {/* SIZE */}
          {productData.sizes && productData.sizes.length > 0 ? (
            <div className="mt-8">
              <p className="font-semibold">Select Size:</p>

              <div className="flex gap-3 mt-2">
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 rounded-lg transition
                      ${selectedSize === size ? "bg-black text-white" : "hover:bg-gray-200"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {selectedSize && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: <b>{selectedSize}</b>
                </p>
              )}
            </div>
          ) : (
            <p className="mt-8 text-gray-500">No size selection required.</p>
          )}

          <button
            onClick={handleAddToCart}
            className="mt-7 px-6 py-3 rounded-lg text-white font-medium bg-black hover:bg-gray-800"
          >
            Add to Cart
          </button>

          <div className="mt-5 space-y-1 text-sm text-gray-700">
            <p>100% Original product</p>
            <p>Cash on delivery available</p>
            <p>Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description + Reviews */}
      <div className="mt-16 border-t pt-8">
        <div className="flex gap-6 text-lg font-medium">
          <button
            onClick={() => setActiveTab("description")}
            className={activeTab === "description" ? "underline" : ""}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={activeTab === "reviews" ? "underline" : ""}
          >
            Reviews
          </button>
        </div>

        <div className="mt-5 text-gray-700">
          {activeTab === "description" ? (
            <p>{productData.description}</p>
          ) : (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>

      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
