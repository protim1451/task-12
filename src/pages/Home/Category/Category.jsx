import React from 'react';
import cat from '../../../assets/category/cat.jpg';
import dog from '../../../assets/category/dog2.jpeg';
import bird from '../../../assets/category/bird4.jpeg';
import fish from '../../../assets/category/fish.jpg';
import rabbit from '../../../assets/category/rabbit.jpg';
import hamster from '../../../assets/category/hamster.jpeg';

const categories = [
  { name: 'Cats', img: cat },
  { name: 'Dogs', img: dog },
  { name: 'Rabbits', img: rabbit },
  { name: 'Fish', img: fish },
  { name: 'Birds', img: bird },
  { name: 'Hamsters', img: hamster },  
];

const Category = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Pet Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img className="w-full h-48 object-cover" src={category.img} alt={category.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">{category.name}</div>
            </div>
            <div className="px-6 pt-4 pb-2 text-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
