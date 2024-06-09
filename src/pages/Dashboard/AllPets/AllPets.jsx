import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllPets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/pets');
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, []);

    const deletePet = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/pets/${id}`);
            setPets(pets.filter(pet => pet._id !== id));
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Serial</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Image</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, index) => (
                        <tr key={pet._id}>
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{pet.name}</td>
                            <td className="py-2 px-4 border-b">{pet.category}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={pet.imageUrl} alt={pet.name} className="w-16 h-16 object-cover" />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => deletePet(pet._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllPets;
