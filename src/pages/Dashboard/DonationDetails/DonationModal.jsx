import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const DonationModal = ({ show, onClose, campaignId }) => {
    const [amount, setAmount] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
          return;
        }
      
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });
      
        if (error) {
          console.error('Error creating payment method:', error);
          return;
        }
      
        console.log('Payment method created:', paymentMethod);
      
        try {
          const response = await axios.post(`http://localhost:3000/api/donations`, {
            amount,
            paymentMethodId: paymentMethod.id,
            campaignId,
          });
      
          console.log('Server response:', response.data);
      
          if (response.data.success) {
            onClose();
            alert('Donation successful!');
          } else {
            alert('Donation failed!');
          }
        } catch (error) {
          console.error('Error making donation:', error);
          alert('Donation failed!');
        }
      };
      

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Donate to this campaign</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Donation Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Credit Card</label>
                        <CardElement className="p-2 border border-gray-300 rounded" />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        disabled={!stripe}
                    >
                        Donate
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 text-gray-500">Close</button>
            </div>
        </div>
    );
};

export default DonationModal;
