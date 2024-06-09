import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllDonationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/donation-campaigns');
                setCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, []);

    const deleteCampaign = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/donation-campaigns/${id}`);
            setCampaigns(campaigns.filter(campaign => campaign._id !== id));
        } catch (error) {
            console.error('Error deleting campaign:', error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Serial</th>
                        <th className="py-2 px-4 border-b">Pet Name</th>
                        <th className="py-2 px-4 border-b">Pet Image</th>
                        <th className="py-2 px-4 border-b">Max Amount</th>
                        <th className="py-2 px-4 border-b">Last Date</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map((campaign, index) => (
                        <tr key={campaign._id}>
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{campaign.petName}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={campaign.petImage} alt={campaign.petName} className="w-16 h-16 object-cover" />
                            </td>
                            <td className="py-2 px-4 border-b">$ {campaign.maxAmount}</td>
                            <td className="py-2 px-4 border-b">{new Date(campaign.lastDate).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    onClick={() => deleteCampaign(campaign._id)} 
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

export default AllDonationCampaigns;
