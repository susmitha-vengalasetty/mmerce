import React from "react";
import { imageList } from "./assets/images";
import {Routes,Route} from 'react-router-dom';
import Home from './assets/pages/Home';
import Collection from './assets/pages/Collection';
import About from './assets/pages/About';
import Cart from './assets/pages/Cart';
import Orders from './assets/pages/Orders';
import PlaceOrder from './assets/pages/PlaceOrder';
import Product from './assets/pages/Product';
import Login from './assets/pages/Login';
import Contact from './assets/pages/Contact';
import Navbar from './assets/components/Navbar';
import Footer from "./assets/components/Footer";
import SearchBar from "./assets/components/SearchBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./assets/pages/Profile";




export default function App() {
  return (
    <>
    {/* <div className="grid grid-cols-3 gap-4 p-4">
      {imageList.map((src, i) => (
        <img key={i} src={src} alt={`Image ${i}`} className="rounded" />
      ))}
    </div> */}

    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    {/* <div className='px-0 sm:px-2 md:px-6 lg:px-6'> */}
      <ToastContainer
      position="top-center" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        pauseOnHover
         />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/product/:id' element={<Product/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path="/profile" element={<Profile />} />

      </Routes>

      <Footer />

    </div>
    </>
  );
}
