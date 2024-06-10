import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Select from 'react-select';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const axiosPublic = useAxiosPublic();

  
  const fetchPets = useCallback(async () => {
    try {
      const response = await axiosPublic.get('/api/pets', {
        params: {
          page,
          limit: 10,
          searchTerm,
          category: selectedCategory ? selectedCategory.value : '',
        },
      });
      setPets((prevPets) => [...prevPets, ...response.data]);
      if (response.data.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  }, [page, searchTerm, selectedCategory, axiosPublic]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPets([]); 
    setPage(1); 
    setHasMore(true); 
  };

  const handleCategoryChange = (option) => {
    setSelectedCategory(option);
    setPets([]); 
    setPage(1); 
    setHasMore(true); 
  };

  const filteredPets = pets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? pet.category === selectedCategory.value : true)
    );
  });

  const categories = [
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'fish', label: 'Fish' },
    { value: 'bird', label: 'Bird' },
  ];

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Pet Listing</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded mr-4"
        />
        <Select
          options={categories}
          onChange={handleCategoryChange}
          placeholder="Select category"
          isClearable
          className="w-1/4"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet, idx) => (
          <div key={idx} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg" src={pet.imageUrl} alt={pet.name} />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {pet.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">Age: {pet.age}</p>
              <p className="font-normal text-gray-700 dark:text-gray-400">Location: {pet.location}</p>
              <a
                href={`/pet/${pet._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PetListing;
