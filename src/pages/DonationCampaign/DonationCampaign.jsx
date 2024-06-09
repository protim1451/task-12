import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const DonationCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const axiosPublic = useAxiosPublic();

    const fetchCampaigns = async () => {
        try {
            const response = await axiosPublic.get(`/api/donation-campaigns?page=${page}&limit=9`);
            if (response.data.length > 0) {
                setCampaigns(prevCampaigns => [...prevCampaigns, ...response.data]);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error);
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []); 

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">Donation Campaigns</h1>
            <InfiniteScroll
                dataLength={campaigns.length}
                next={fetchCampaigns}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p className="text-center">No more campaigns</p>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                            <img src={campaign.petImage} alt={campaign.petName} className="w-full h-48 object-cover rounded mb-4" />
                            <h2 className="text-xl font-bold mb-2">{campaign.petName}</h2>
                            <p className="text-gray-700 mb-2">Max Donation Amount: ${campaign.maxAmount}</p>
                            <p className="text-gray-700 mb-4">Donated Amount: ${campaign.donatedAmount || 0}</p>
                            <button
                                onClick={() => window.location.href = `/donationCampaign/${campaign._id}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default DonationCampaign;
