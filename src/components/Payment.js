import React from 'react';
import axios from 'axios';

const Payment = () => {
	const handlePayment = async () => {
		try {
			// Create order on the backend
			const response = await axios.post('http://localhost:8000/create-order/', { amount: 500 });
			const { order_id, amount, currency } = response.data;

			const options = {
				key: "YOUR_KEY_ID", // Replace with your Razorpay Key ID
				amount: amount,
				currency: currency,
				name: "Demo Payment",
				description: "Test Transaction",
				order_id: order_id,
				handler: async function (response) {
					const paymentData = {
						razorpay_order_id: response.razorpay_order_id,
						razorpay_payment_id: response.razorpay_payment_id,
						razorpay_signature: response.razorpay_signature,
					};

					// Verify payment
					const verifyRes = await axios.post("http://localhost:8000/verify-payment/", paymentData);
					alert(verifyRes.data.status);
				},
				prefill: {
					name: "John Doe",
					email: "johndoe@example.com",
					contact: "9999999999",
				},
				theme: {
					color: "#528FF0",
				},
			};

			const razorpay = new window.Razorpay(options);
			razorpay.open();
		} catch (error) {
			console.error("Payment initiation failed:", error);
		}
	};

	return (
		<div className="payment-container">
			<h1>Make a Payment</h1>
			<button onClick={handlePayment}>Pay ₹500</button>
		</div>
	);
};

export default Payment;
