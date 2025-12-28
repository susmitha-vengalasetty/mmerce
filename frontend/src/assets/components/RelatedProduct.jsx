import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    console.log("Received category →", category);
  console.log("Received subCategory →", subCategory);
  console.log("Available products:", products);
    if (!products || products.length === 0) return;

    // Step 1 — Match SAME category
    let filtered = products.filter(
      (item) =>
        item.category?.toLowerCase() === category?.toLowerCase()
    );

    console.log("Matched category count:", filtered.length);

    // Step 2 — Match SAME subCategory
    filtered = filtered.filter(
      (item) =>
        item.subCategory?.toLowerCase() === subCategory?.toLowerCase()
    );

    console.log("Matched subCategory count:", filtered.length);

    // Step 3 — Take max 4
    setRelated(filtered.slice(0, 4));
  }, [category, subCategory, products]);

  return (
    <div className="related-products mt-12">
      <h2 className="text-xl font-semibold mb-4">Related Products</h2>

      {related.length === 0 ? (
        <p>No related products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {related.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image?.[0]}   // ✅ Correct image format
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
