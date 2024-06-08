import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-800 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">About Us</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Welcome to Petconnect! Our mission is to connect loving homes with pets in need. We provide a platform where potential pet owners can browse through various pet categories and find their perfect companion. Whether you are looking for a playful kitten, a loyal dog, or a serene fish, Petconnect is here to help you find your new best friend.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Our website was created out of a deep love for animals and a desire to reduce the number of pets in shelters. By providing a seamless and user-friendly experience, we aim to make the process of adopting a pet as smooth and enjoyable as possible. Join us in our mission to give every pet a loving home!
        </p>
        <div className="mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
