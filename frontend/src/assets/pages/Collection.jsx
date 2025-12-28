import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { imageMap } from '../images';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    const value = e.target.value;
    if(category.includes(value)) {
      setCategory(prev=> prev.filter(item=> item !== value))
    }
    else{
      setCategory(prev => [...prev,value])
    }
  }
  const toggleSubCategory = (e) =>{
    const value = e.target.value;
    if(subCategory.includes(value)) {
      setSubCategory(prev=> prev.filter(item=> item !== value))
    }
    else{
      setSubCategory(prev => [...prev,value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productsCopy)
  }
  // useEffect(()=>{
  //   setFilterProducts(products)
  // },[])

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

        default:
          applyFilter();
          break;
    }
  }

  useEffect(()=>{
   applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(() =>{
    sortProduct();
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() =>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={imageMap.dropdown_icon} />
        {/* Catergory Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'clothing'} onChange={toggleCategory}/>Clothing
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'accessories'}onChange={toggleCategory}/>Accessories
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'electronics'} onChange={toggleCategory} />Electronics
            </p>
          </div>
          </div>


{/* Subcategory */}
           <div className={`border border-gray-300 my-5 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'men'} onChange={toggleSubCategory}/>Men
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'women'} onChange={toggleSubCategory}/>Women
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'kids'} onChange={toggleSubCategory}/>Kids
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'accessories'} onChange={toggleSubCategory}/>Accessories
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'gadgets'} onChange={toggleSubCategory}/>Gadgets
            </p>
          </div>
          </div>
        </div>

          {/* Right Side */}
          <div className='flex-1 py-8'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
              <Title text1={'ALL'} text2={'COLLECTIONS'} ></Title>

              {/* Product Sort */}
              <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                <option value="relavent">Sort by: Relavent</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {/* Map products */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProducts.map((item,index)=>(
                  <ProductItem key={item._id} name={item.name} price={item.price} image={item.image} id={item._id} />
                ))
              }
            </div>
          </div>
      </div>
  )
}
export default Collection
