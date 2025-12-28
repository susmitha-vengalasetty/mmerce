import React from 'react'
import Title from '../components/Title'
import contact from "../../assets/contact.jpeg"
import NewsLetterbox from '../components/NewsLetterbox'

const Contact = () => {
  return (
    <div >
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-20'>
        <img className='w-full md:max-w-[480px]' src={contact} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Hanuman Junction <br />Suite 342,Eluru,Vijayawada,Andhra Pradesh,India</p>
          <p className='text-gray-500'>Tel: {435} 555-0325 <br /> Email:contact@Uwow.com</p>
          <p className='font-semibold text-xl text-gray-500'>Careers at Wow</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <NewsLetterbox />
    </div>
  )
}

export default Contact
