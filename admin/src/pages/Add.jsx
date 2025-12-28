import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify';

const Add = ({token}) => {

  // IMAGE STATES
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // PRODUCT FIELD STATES
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // SUBCATEGORY STATE
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  // CATEGORY - SUBCATEGORY DATA
  const subCategories = {
    clothing: ["men", "women", "kids"],
    electronics: ["gadgets", "accessories"],
    accessories: ["men", "women"]
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);

    if (subCategories[selected]) {
      setSubCategoryOptions(subCategories[selected]);
    } else {
      setSubCategoryOptions([]);
    }
  };

  // Size selection toggle
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

 const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    // FIXED — append images correctly
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);
    if (image3) formData.append("image3", image3);
    if (image4) formData.append("image4", image4);

    const response = await axios.post(
      backendUrl + "/api/product/add",
      formData,
      {
        headers: {
           Authorization: `Bearer ${token}`,   // 🔥 Correct way
          "Content-Type": "multipart/form-data"
        }
      }
    );

    // console.log(response.data);
    // alert("Product Uploaded Successfully!");
    if(response.data.success){
      toast.success(response.data.message)
      setName('')
      setDescription('')
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice('')
    }else{
      toast.error(response.data.message)
    }

  } catch (error) {
    console.error(error);
    toast.error(error.message)
  }
};


    

  // Image handler mapper
  const imageHandlers = [setImage1, setImage2, setImage3, setImage4];

  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6 p-4">

        {/* UPLOAD IMAGES */}
        <div>
          <p className="mb-2 font-semibold">Upload Image</p>

          <div className="flex gap-3">
            {[1, 2, 3, 4].map((num, index) => {
              const imgState = [image1, image2, image3, image4][index];

              return (
                <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
                  <img
                    className="w-20 h-20 object-cover border rounded"
                    src={imgState ? URL.createObjectURL(imgState) : assets.upload_area}
                    alt=""
                  />

                  <input
                    type="file"
                    id={`image${num}`}
                    hidden
                    onChange={(e) => imageHandlers[index](e.target.files[0])}
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* PRODUCT NAME */}
        <div className="w-full">
          <p className="mb-2 font-semibold">Product name</p>
          <input
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* PRODUCT DESCRIPTION */}
        <div className="w-full">
          <p className="mb-2 font-semibold">Product description</p>
          <input
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            type="text"
            placeholder="Write content here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* CATEGORY ROW */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">

          {/* CATEGORY */}
          <div>
            <p className="mb-1 font-semibold">Product category</p>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="border p-2 rounded w-[150px]"
              required
            >
              <option value="">Select Category</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* SUBCATEGORY */}
          <div>
            <p className="mb-1 font-semibold">SubCategory</p>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="border p-2 rounded w-[150px]"
              required
            >
              <option value="">Select SubCategory</option>
              {subCategoryOptions.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE */}
          <div>
            <p className="mb-1 font-semibold">Product Price</p>
            <input
              className="border p-2 rounded w-[120px]"
              type="number"
              placeholder="25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

        </div>

        {/* SIZES */}
        <div>
          <p className="mb-2 font-semibold">Product Sizes</p>

          <div className="flex gap-3">
            {["S", "M", "L", "XL", "Free Size"].map((size) => (
              <p
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 rounded cursor-pointer border 
                  ${sizes.includes(size) ? "bg-blue-500 text-white" : "bg-slate-200"}`}
              >
                {size}
              </p>
            ))}
          </div>
        </div>

        {/* BESTSELLER */}
        <div>
          <p className="mb-1 font-semibold">Bestseller</p>
          <select
            value={bestseller}
            onChange={(e) => setBestseller(e.target.value === "true")}
            className="border p-2 rounded w-[150px]"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload Product
        </button>

      </form>
    </>
  );
};

export default Add;
