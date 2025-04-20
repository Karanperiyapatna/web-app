import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentProcess = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const {
		transaction_id,
        _id,
		order_id,
		userDetails,
		labour_name,
		labour_mobile,
        register_via,
        referred_by,
        price,
        discount,
		final_price,
		isPaymentSuccess
	} = location.state || {};

	const [processing, setProcessing] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setProcessing(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

    // Send payment info to backend after success
	useEffect(() => {
		if (processing) return;

		if (isPaymentSuccess) {
			const requestBody = {
				_id,
				transaction_id,
				order_id,
				username: userDetails?.username,
				labour_name,
				labour_mobile,
				register_via,
				referred_by,
				price,
				discount,
				final_price,
			};

			const updatePayment = async () => {
				try {
					const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/payment_update/`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(requestBody),
					});
					const data = await response.json();
					console.log("Payment update response:", data);
				} catch (error) {
					console.error("Error updating payment:", error);
				}
			};

			updatePayment();
		}
	}, [processing]);

	if (processing) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100 bg-light text-dark flex-column">
				<h4>Processing your payment...</h4>
				<p>Please do not click back or refresh this page.</p>
			</div>
		);
	}

	if (!isPaymentSuccess) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100 bg-white text-dark">
				<div className="card shadow p-4 text-center" style={{ width: "400px", borderRadius: "12px" }}>
					<h3 className="mb-4 text-danger">Payment Failed</h3>
					<p>Oops! Something went wrong.</p>
					<p>Please try again.</p>
					<button className="btn btn-danger mt-3" onClick={() => navigate(-1)}>
						Go Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="d-flex justify-content-center align-items-center vh-100 bg-white text-dark">
            <div className="card shadow p-4 text-center" style={{ width: "400px", borderRadius: "12px" }}>
                <h3 className="mb-4" style={{ color: "blue" }}>Payment Successful!</h3>
                <p style={{ color: "black" }}><strong>Process ID:</strong> {_id}</p>
                <p style={{ color: "black" }}><strong>Transaction ID:</strong> {transaction_id}</p>
                <p style={{ color: "black" }}><strong>Order ID:</strong> {order_id}</p>
                <p style={{ color: "black" }}><strong>Name:</strong> {userDetails?.username}</p>
                <p style={{ color: "black" }}><strong>Labour Name:</strong> {labour_name}</p>
                <p style={{ color: "black" }}><strong>Labour Mobile:</strong> {labour_mobile}</p>
                <p style={{ color: "black" }}><strong>Price:</strong> {price}</p>
                <p style={{ color: "black" }}><strong>discount:</strong> {discount}</p>
                <p style={{ color: "black" }}><strong>Amount Paid:</strong> ₹{final_price}</p>
                <p style={{ color: "black" }}><strong>register_via:</strong> ₹{register_via}</p>
                <p style={{ color: "black" }}><strong>register_via:</strong> ₹{referred_by}</p>


                <button
                    className="btn mt-3"
                    style={{ backgroundColor: "lightblue", color: "black", fontWeight: "bold" }}
                    onClick={() => navigate("/")}
                >
                    Go to Dashboard
                </button>
            </div>

		</div>
	);
};

export default PaymentProcess;
