import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DonationModal from './DonationModal';
import RecommendedDonations from './RecommendedDonations';

const stripePromise = loadStripe('your-stripe-public-key');

const DonationDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/donation-campaigns/${id}`);
                setCampaign(response.data);
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            }
        };

        fetchCampaign();
    }, [id]);

    if (!campaign) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">{campaign.petName}</h1>
            <img src={campaign.petImage} alt={campaign.petName} className="w-full h-96 object-cover rounded mb-4" />
            <p className="text-gray-700 mb-2">{campaign.longDescription}</p>
            <p className="text-gray-700 mb-2">Max Donation Amount: ${campaign.maxAmount}</p>
            <p className="text-gray-700 mb-2">Donated Amount: ${campaign.donatedAmount || 0}</p>
            <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Donate Now
            </button>
            <Elements stripe={stripePromise}>
                <DonationModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    campaignId={id}
                />
            </Elements>
            <RecommendedDonations currentCampaignId={id} />
        </div>
    );
};

export default DonationDetails;
