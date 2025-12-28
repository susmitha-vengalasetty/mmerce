import React from 'react'

const NewsLetterbox = () => {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
    }
  return (
    <div>
      <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Stay updated with our latest collections, exclusive deals, and special discounts.
Subscribe to our newsletter and never miss an update!
        </p>

        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' />
            <button type="submit" className='font-bold bg-black text-white text-lg px-6 py-3 sm:px-10 sm:py-3'>SUBSCRIBE</button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterbox
