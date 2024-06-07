import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateDonationCampaign = () => {
    const [petName, setPetName] = useState('');
    const [image, setImage] = useState(null);
    const [maxAmount, setMaxAmount] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(image_hosting_api, formData);
            setImage(res.data.data.url);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const donationCampaign = {
            petName,
            petImage: image,
            maxAmount,
            lastDate,
            shortDescription,
            longDescription,
            createdAt: new Date(),
            owner: user.email,
        };

        try {
            await axiosPublic.post('/api/donation-campaigns', donationCampaign);
            setLoading(false);
            navigate('/dashboard/myDonationCampaign');
        } catch (error) {
            console.error('Error creating donation campaign:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">Create Donation Campaign</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Pet Name</label>
                    <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        className="mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Pet Picture</label>
                    <input type="file" onChange={handleImageUpload} className="mt-1 block w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Maximum Donation Amount</label>
                    <input
                        type="number"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        className="mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Date of Donation</label>
                    <input
                        type="date"
                        value={lastDate}
                        onChange={(e) => setLastDate(e.target.value)}
                        className="mt-1 block w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Short Description</label>
                    <textarea
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        className="mt-1 block w-full"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Long Description</label>
                    <textarea
                        value={longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                        className="mt-1 block w-full"
                    ></textarea>
                </div>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded">
                    {loading ? 'Creating...' : 'Create Campaign'}
                </button>
            </form>
        </div>
    );
};

export default CreateDonationCampaign;
