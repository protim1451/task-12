import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllDonations = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await axios.get('https://b9a12-server-side-protim1451.vercel.app/api/donations');
                setDonations(response.data);
            } catch (error) {
                console.error('Error fetching donations:', error);
            }
        };

        fetchDonations();
    }, []);

    return (
        <div className="overflow-x-auto">
            <h1 className="text-2xl font-bold mb-4">All Donations</h1>
            <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Serial</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Campaign ID</th>
                        <th className="py-2 px-4 border-b">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((donation, index) => (
                        <tr key={donation._id}>
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">${donation.amount}</td>
                            <td className="py-2 px-4 border-b">{donation.campaignId}</td>
                            <td className="py-2 px-4 border-b">{donation.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllDonations;
