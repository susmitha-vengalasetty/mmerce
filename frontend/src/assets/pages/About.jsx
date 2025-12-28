import React from 'react';
import Title from '../components/Title';
import NewsLetterbox from '../components/NewsLetterbox';

import about_img from '../../assets/about_img.jpeg';

const About = () => {
  return (
    <div className="px-4 md:px-16">
      {/* ABOUT US Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 items-center">
        <img
          className="w-full md:max-w-[450px] rounded-lg"
          src={about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Discover our exclusive collection of products designed to make your life easier, stylish, and more enjoyable. From the latest fashion trends to essential gadgets, we bring you quality and variety all in one place.
          </p>
          <p>
            Enjoy seamless shopping with fast delivery, secure payments, and exceptional customer service. Join thousands of happy customers who trust us for their daily needs and special purchases.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to provide a seamless and enjoyable shopping experience, offering high-quality products that meet your needs and exceed your expectations. We strive to make every purchase convenient, trustworthy, and satisfying for our customers.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="text-xl py-4 text-center">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-20">
        <div className="border px-8 py-8 flex flex-col gap-4 rounded-lg">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We are committed to ensuring the highest quality in every product we offer. Each item undergoes strict quality checks to guarantee durability, authenticity, and customer satisfaction, so you can shop with confidence.
          </p>
        </div>

        <div className="border px-8 py-8 flex flex-col gap-4 rounded-lg">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shop anytime, anywhere with our user-friendly platform, easy navigation, and smooth checkout process designed to save you time and effort.
          </p>
        </div>

        <div className="border px-8 py-8 flex flex-col gap-4 rounded-lg">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our dedicated support team is here to assist you at every step, ensuring a hassle-free shopping experience and prompt resolution of any queries or concerns.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetterbox />
    </div>
  );
};

export default About;
