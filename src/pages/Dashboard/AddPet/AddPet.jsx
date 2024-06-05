import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
//console.log("Image Hosting Key:", image_hosting_key); 
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPet = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const categories = [
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'fish', label: 'Fish' },
    { value: 'bird', label: 'Bird' }
  ];

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(image_hosting_api, formData);
      setImageUrl(response.data.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onSubmit = async (data) => {
    const petData = {
      ...data,
      imageUrl,
      adopted: false,
      addedAt: new Date(),
      owner: user.email 
    };

    try {
      await axiosPublic.post('/api/pets', petData);
      //navigate('/myAddedPet');
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6">Add a Pet</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Name</label>
          <input
            type="text"
            {...register('name', { required: 'Pet name is required' })}
            className="mt-1 block w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Age</label>
          <input
            type="number"
            {...register('age', { required: 'Pet age is required' })}
            className="mt-1 block w-full"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Category</label>
          <Select
            options={categories}
            onChange={(option) => setValue('category', option.value, { shouldValidate: true })}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pet Location</label>
          <input
            type="text"
            {...register('location', { required: 'Pet location is required' })}
            className="mt-1 block w-full"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <input
            type="text"
            {...register('shortDescription', { required: 'Short description is required' })}
            className="mt-1 block w-full"
          />
          {errors.shortDescription && <p className="text-red-500 text-sm">{errors.shortDescription.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Long Description</label>
          <textarea
            {...register('longDescription', { required: 'Long description is required' })}
            className="mt-1 block w-full"
            rows="4"
          />
          {errors.longDescription && <p className="text-red-500 text-sm">{errors.longDescription.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPet;
