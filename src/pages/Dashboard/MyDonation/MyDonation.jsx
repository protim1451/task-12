import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const MyDonation = () => {
  const { user } = useAuth(); 
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`https://b9a12-server-side-protim1451.vercel.app/user-donations?email=${user.email}`);
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    if (user) {
      fetchDonations();
    }
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Details of My Donations</h1>
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2">Serial</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Payment Status</th>
            <th className="py-2">Campaign ID</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, index) => (
            <tr key={donation._id}>
              <td className="py-2 ml-3">{index + 1}</td>
              <td className="py-2 ml-3">{donation.amount}</td>
              <td className="py-2 ml-3">{donation.paymentStatus}</td>
              <td className="py-2 ml-3">{donation.campaignId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyDonation;
