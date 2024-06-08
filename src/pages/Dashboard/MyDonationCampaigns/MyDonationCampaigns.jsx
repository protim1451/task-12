import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';

Modal.setAppElement('#root');

const MyDonationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchCampaigns();
        }
    }, [user]);

    const fetchCampaigns = async () => {
        if (!user || !user.email) {
            console.error('User is not authenticated or email is missing');
            return;
        }
        try {
            console.log(`Fetching campaigns for user: ${user.email}`); // Log the email being used
            const response = await axiosPublic.get(`/api/donation-campaigns?owner=${user.email}`);
            setCampaigns(response.data);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    const handlePauseCampaign = async (id, isPaused) => {
        try {
            await axiosPublic.patch(`/api/donation-campaigns/${id}/pause`, { isPaused });
            setCampaigns(campaigns.map(campaign =>
                campaign._id === id ? { ...campaign, isPaused } : campaign
            ));
        } catch (error) {
            console.error('Error pausing campaign:', error);
        }
    };

    const openModal = (campaign) => {
        setSelectedCampaign(campaign);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCampaign(null);
    };

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">My Donation Campaigns</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Photo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maximum Donation Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                    {campaigns.map(campaign => (
                        <tr key={campaign._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{campaign.petName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={campaign.petImage} alt={campaign.petName} className="w-24 h-24 object-cover rounded" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{campaign.maxAmount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="relative pt-1">
                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                                        <div
                                            style={{ width: `${(campaign.donatedAmount / campaign.maxAmount) * 100}%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                                        ></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => navigate(`/dashboard/edit-donation/${campaign._id}`)}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handlePauseCampaign(campaign._id, !campaign.isPaused)}
                                        className={`px-2 py-1 ${campaign.isPaused ? 'bg-gray-500' : 'bg-red-500'} text-white rounded`}
                                    >
                                        {campaign.isPaused ? 'Unpause' : 'Pause'}
                                    </button>
                                    <button
                                        onClick={() => openModal(campaign)}
                                        className="px-2 py-1 bg-blue-500 text-white rounded"
                                    >
                                        View Donators
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedCampaign && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="View Donators"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2 className="text-xl font-bold mb-4">Donators for {selectedCampaign.petName}</h2>
                    <ul>
                        {selectedCampaign.donators.map((donator, index) => (
                            <li key={index} className="mb-2">
                                {donator.name}: ${donator.amount}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Close
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default MyDonationCampaigns;
