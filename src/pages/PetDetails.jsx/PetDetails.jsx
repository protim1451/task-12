import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import './PetDetails.css';
import Swal from 'sweetalert2';


const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const response = await axiosPublic.get(`/api/pets/${id}`);
      setPet(response.data);
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAdoptSubmit = async (event) => {
    event.preventDefault();
    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.imageUrl,
      userName: user.name,
      userEmail: user.email,
      userPhone: event.target.phone.value,
      userAddress: event.target.address.value,
    };

    try {
      await axiosPublic.post('/api/adoptions', adoptionData);
      closeModal();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Adoption request submitted successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/petListing');
    } catch (error) {
      console.error('Error submitting adoption request:', error);
    }
  };

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">{pet.name}</h1>
      <div className="flex">
        <img className="w-1/2 rounded-lg" src={pet.imageUrl} alt={pet.name} />
        <div className="ml-10">
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Location:</strong> {pet.location}</p>
          <p><strong>Description:</strong> {pet.longDescription}</p>
          <button
            onClick={openModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Adopt
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Adopt Pet Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Adopt {pet.name}</h2>
        <form onSubmit={handleAdoptSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User Name</label>
            <input
              type="text"
              value={user.displayName}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PetDetails;
