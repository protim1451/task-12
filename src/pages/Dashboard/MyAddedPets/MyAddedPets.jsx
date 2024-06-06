import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

Modal.setAppElement('#root');

const MyAddedPets = () => {
  const [pets, setPets] = useState([]);
  const [deletePetId, setDeletePetId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adoptedPetId, setAdoptedPetId] = useState(null);
  const [isAdoptedModalOpen, setIsAdoptedModalOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
  }, [pageIndex, pageSize]);

  const fetchPets = async () => {
    try {
      const response = await axiosPublic.get(`/api/pets?owner=${user.email}&page=${pageIndex + 1}&limit=${pageSize}`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const handleDeletePet = async () => {
    try {
      await axiosPublic.delete(`/api/pets/${deletePetId}`);
      setPets(pets.filter(pet => pet._id !== deletePetId));
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const handleAdoptPet = async () => {
    try {
      await axiosPublic.patch(`/api/pets/${adoptedPetId}`, { adopted: true });
      setPets(pets.map(pet => pet._id === adoptedPetId ? { ...pet, adopted: true } : pet));
      closeAdoptedModal();
    } catch (error) {
      console.error('Error adopting pet:', error);
    }
  };

  const openDeleteModal = (petId) => {
    setDeletePetId(petId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletePetId(null);
  };

  const openAdoptedModal = (petId) => {
    setAdoptedPetId(petId);
    setIsAdoptedModalOpen(true);
  };

  const closeAdoptedModal = () => {
    setIsAdoptedModalOpen(false);
    setAdoptedPetId(null);
  };

  const handlePageChange = (direction) => {
    setPageIndex(prev => prev + direction);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);  // Reset to first page when page size changes
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">My Added Pets</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adoption Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pets.map((pet, index) => (
            <tr key={pet._id}>
              <td className="px-6 py-4 whitespace-nowrap">{pageIndex * pageSize + index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.category}</td>
              <td className="px-6 py-4 whitespace-nowrap"><img src={pet.imageUrl} alt="Pet" className="w-16 h-16" /></td>
              <td className="px-6 py-4 whitespace-nowrap">{pet.adopted ? 'Adopted' : 'Not Adopted'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/dashboard/update-pet/${pet._id}`)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openDeleteModal(pet._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openAdoptedModal(pet._id)}
                    className={`px-2 py-1 text-white rounded ${pet.adopted ? 'bg-gray-500' : 'bg-green-500'}`}
                    disabled={pet.adopted}
                  >
                    Adopted
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <div>
          <button
            onClick={() => handlePageChange(-1)}
            disabled={pageIndex === 0}
            className="px-2 py-1 bg-gray-500 text-white rounded mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(1)}
            disabled={pets.length < pageSize}
            className="px-2 py-1 bg-gray-500 text-white rounded"
          >
            Next
          </button>
        </div>
        <div>
          Page{' '}
          <strong>
            {pageIndex + 1}
          </strong>
        </div>
        <div>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border-gray-300 rounded"
          >
            {[10, 20, 30, 40, 50].map(size => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Pet Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this pet?</h2>
        <button
          onClick={handleDeletePet}
          className="px-4 py-2 bg-red-500 text-white rounded mr-2"
        >
          Yes
        </button>
        <button
          onClick={closeDeleteModal}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          No
        </button>
      </Modal>

      <Modal
        isOpen={isAdoptedModalOpen}
        onRequestClose={closeAdoptedModal}
        contentLabel="Adopt Pet Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">Are you sure you want to mark this pet as adopted?</h2>
        <button
          onClick={handleAdoptPet}
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
        >
          Yes
        </button>
        <button
          onClick={closeAdoptedModal}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          No
        </button>
      </Modal>
    </div>
  );
};

export default MyAddedPets;
