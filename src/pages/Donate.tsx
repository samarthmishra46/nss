import { useState } from 'react';

export default function Donate() {
  const [amount, setAmount] = useState('');

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    const options = {
      key: 'your_razorpay_key_here', // Replace with your Razorpay Key
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'NSS Donation',
      description: 'Support the NSS initiative',
      image: '/nsslogo.png', // Change with your logo
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: 'John Doe', // You can auto-fill user details
        email: 'johndoe@example.com',
        contact: '9876543210'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Support NSS with a Donation</h2>

        <input
          type="number"
          placeholder="Enter amount (INR)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
}
