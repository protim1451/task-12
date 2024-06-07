import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const EditDonation = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [formData, setFormData] = useState({
        petName: '',
        petImage: '',
        maxAmount: '',
        lastDate: '',
        shortDescription: '',
        longDescription: '',
    });
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCampaign();
    }, []);

    const fetchCampaign = async () => {
        try {
            const response = await axiosPublic.get(`/api/donation-campaigns/${id}`);
            setCampaign(response.data);
            setFormData({
                petName: response.data.petName,
                petImage: response.data.petImage,
                maxAmount: response.data.maxAmount,
                lastDate: response.data.lastDate,
                shortDescription: response.data.shortDescription,
                longDescription: response.data.longDescription,
            });
        } catch (error) {
            console.error('Error fetching campaign:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosPublic.put(`/api/donation-campaigns/${id}`, formData);
            navigate('/dashboard/myDonationCampaign');
        } catch (error) {
            console.error('Error updating campaign:', error);
        }
    };

    if (!campaign) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">Edit Donation Campaign</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pet Name</label>
                    <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Pet Image URL</label>
                    <input
                        type="text"
                        name="petImage"
                        value={formData.petImage}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Maximum Donation Amount</label>
                    <input
                        type="number"
                        name="maxAmount"
                        value={formData.maxAmount}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Last Date</label>
                    <input
                        type="date"
                        name="lastDate"
                        value={formData.lastDate}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Long Description</label>
                    <textarea
                        name="longDescription"
                        value={formData.longDescription}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            </form>
        </div>
    );
};

export default EditDonation;
