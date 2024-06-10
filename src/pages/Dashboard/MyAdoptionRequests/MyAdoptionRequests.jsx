import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import axiosPrivate from '../../../hooks/useAxiosPrivate';
import axios from 'axios';

const MyAdoptionRequests = () => {
    const [requests, setRequests] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchAdoptionRequests();
        }
    }, [user]);

    const fetchAdoptionRequests = async () => {
        if (!user || !user.email) {
          console.error('User is not authenticated or email is missing');
          return;
        }
        try {
          const response = await axios.get(`https://b9a12-server-side-protim1451.vercel.app/api/adoption-requests?owner=${user.email}`);
          console.log('Adoption requests response:', response.data);
          setRequests(response.data);
        } catch (error) {
          console.error('Error fetching adoption requests:', error);
        }
      };      

    const handleUpdateRequestStatus = async (id, status) => {
        try {
            await axios.patch(`https://b9a12-server-side-protim1451.vercel.app/api/adoption-requests/${id}`, { status });
            setRequests(requests.map(request =>
                request._id === id ? { ...request, status } : request
            ));
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    return (
        <div className="container mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6">My Adoption Requests</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
                    {requests.map(request => (
                        <tr key={request._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{request.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{request.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleUpdateRequestStatus(request._id, 'accepted')}
                                        className="px-2 py-1 bg-green-500 text-white rounded"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleUpdateRequestStatus(request._id, 'rejected')}
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyAdoptionRequests;
