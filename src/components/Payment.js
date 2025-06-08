import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {
		_id,
		order_id,
		userDetails,
		selectedLabour,
		work_category,
		price,
		discount,
		final_price
	} = location.state || {};

	if (!userDetails || !selectedLabour) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100 bg-white text-dark">
				<p>No payment information available</p>
			</div>
		);
	}

	const generateTransactionId = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < 10; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	};

	const handleFinalPay = async () => {
		const transaction_id = generateTransactionId();

		const requestData = {
			order_id,
			transaction_id,
			...userDetails,
			work_category,
			_id: selectedLabour._id,
			labour_id: selectedLabour.labour_id,
			labour_name: selectedLabour.labour_name,
			labour_mobile: selectedLabour.labour_mobile,
			register_via: selectedLabour.register_via,
			referred_by: selectedLabour.referred_by,
			price,
			discount,
			final_price
		};

		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/api/storeCustomerData/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(requestData)
				}
			);
			const responseData = await response.json();

			if (response.ok) {

				const _id = responseData._id;

				// Go to payment process page
				navigate("/payment_process", {
					state: {
						transaction_id,
						order_id,
						_id: _id,
						userDetails,
						labour_name: selectedLabour.labour_name,
						labour_mobile: selectedLabour.labour_mobile,
						register_via: selectedLabour.register_via,
						referred_by: selectedLabour.referred_by,
						price,
						discount,
						final_price,
						isPaymentSuccess: true // Set to false on API failure
					}
				});
			} else {
				alert("Failed to store payment details.");
			}
		} catch (error) {
			console.error("Error storing data:", error);
			alert("Something went wrong.");
		}
	};

	return (
		<div className="bg-white text-dark vh-100 d-flex justify-content-center align-items-center">
			<div className="card shadow p-4" style={{ width: "400px", borderRadius: "12px" }}>
				<h3 className="text-center mb-4">Payment Details</h3>
				<ul className="list-group list-group-flush">
					<li className="list-group-item"><strong>Process ID:</strong> {_id}</li>
					<li className="list-group-item"><strong>Order ID:</strong> {order_id}</li>
					<li className="list-group-item"><strong>Name:</strong> {userDetails.username}</li>
					{/* <li className="list-group-item"><strong>Mobile:</strong> {userDetails.mobile}</li> */}
					<li className="list-group-item"><strong>Email:</strong> {userDetails.email}</li>
					<li className="list-group-item"><strong>Work Category:</strong> {work_category}</li>
					<li className="list-group-item"><strong>Labour Name:</strong> {selectedLabour.labour_name}</li>
					{/* <li className="list-group-item"><strong>Mobile Number:</strong> {selectedLabour.labour_mobile}</li> */}
					<li className="list-group-item"><strong>Price:</strong> ₹{price}</li>
					<li className="list-group-item"><strong>Discount:</strong> ₹{discount}</li>
					<li className="list-group-item"><strong>Final Amount:</strong> ₹{final_price}</li>
				</ul>

				<button onClick={handleFinalPay} className="btn btn-primary mt-4 w-100">
					Pay Now
				</button>
			</div>
		</div>
	);
};

export default Payment;
