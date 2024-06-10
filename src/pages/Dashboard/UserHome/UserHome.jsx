import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const UserHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [petCount, setPetCount] = useState(0);
    const [donationCount, setDonationCount] = useState(0);

    useEffect(() => {
        if (user) {
            fetchUserStats();
        }
    }, [user]);

    const fetchUserStats = async () => {
        try {
            const petsResponse = await fetch(`https://b9a12-server-side-protim1451.vercel.app/api/pets?owner=${user.email}`);
            if (!petsResponse.ok) {
                throw new Error('Failed to fetch pets');
            }
            const petsData = await petsResponse.json();
            setPetCount(petsData.length);

            const donationsResponse = await fetch(`https://b9a12-server-side-protim1451.vercel.app/api/donation-campaigns?owner=${user.email}`);
            if (!donationsResponse.ok) {
                throw new Error('Failed to fetch donations');
            }
            const donationsData = await donationsResponse.json();
            setDonationCount(donationsData.length);
        } catch (error) {
            console.error('Error fetching user stats:', error);
        }
    };

    return (
        <div className="container mx-auto my-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
                <img className="w-32 h-32 rounded-full mb-4" src={user?.photoURL || 'default-avatar.png'} alt="User Avatar" />
                <h1 className="text-3xl font-bold mb-2">{user?.displayName || 'User Name'}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email || 'user@example.com'}</p>
            </div>
            <div className="flex justify-around mt-6">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{petCount}</h2>
                    <p className="text-gray-600 dark:text-gray-400">Pets Added</p>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{donationCount}</h2>
                    <p className="text-gray-600 dark:text-gray-400">Donation Campaigns</p>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
