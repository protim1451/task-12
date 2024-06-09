import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecommendedDonations = ({ currentCampaignId }) => {
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        const fetchRecommended = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/donation-campaigns/recommended?exclude=${currentCampaignId}`);
                setRecommended(response.data);
            } catch (error) {
                console.error('Error fetching recommended campaigns:', error);
            }
        };

        fetchRecommended();
    }, [currentCampaignId]);

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Recommended Donations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommended.map(campaign => (
                    <div key={campaign._id} className="bg-white p-6 rounded-lg shadow-md">
                        <img src={campaign.petImage} alt={campaign.petName} className="w-full h-48 object-cover rounded mb-4" />
                        <h2 className="text-xl font-bold mb-2">{campaign.petName}</h2>
                        <p className="text-gray-700 mb-2">Max Donation Amount: ${campaign.maxAmount}</p>
                        <p className="text-gray-700 mb-2">Donated Amount: ${campaign.donatedAmount || 0}</p>
                        <button
                            onClick={() => window.location.href = `/donation-campaign/${campaign._id}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedDonations;
