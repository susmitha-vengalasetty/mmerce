import React from 'react'
import logo from '../../assets/logo.jpg';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
        <div>
            <img src={logo} className='mb-5 w-32' alt=""/>
            <p className='w-full md:w-2/3 text-gray-600'>Your trusted destination for quality fashion and great value.
We are committed to delivering the best shopping experience with secure payments and fast delivery</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-212-234-4560</li>
                    <li>contact@Uwow.com</li>
                </ul>
            </div>
        </div>
           
                <hr />
                <p className='py-3 text-sm text-center text-gray-600'>Copyright 2025@ wow.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
