import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/LabourList.css'; 
import defaultImage from "../../src/images/profileicon.png";


const LabourList = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { labours, work_category } = location.state || { labours: [], work_category: "N/A" }; // Fallback in case no data is passed

	const [popupView, setPopupView] = useState(null);
	const [userDetails, setUserDetails] = useState({  // Fixed here
		username: "",
		mobile: "",
		email: ""
	});

	const handleUserDetailsChange = (e) => { // Fixed here
		const { name, value } = e.target;
		setUserDetails((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handlePay = async () => {
		try {
			const requestData = {
				...userDetails,
				work_category: work_category 
			};
			const response = await fetch("http://127.0.0.1:8000/api/storeCustomerData/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(requestData)
			});
	
			if (response.ok) {
				alert("Customer data stored successfully!");
				navigate("/payment"); // Navigate to payment page
			} else {
				alert("Failed to store customer data.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("Something went wrong.");
		}
	};
	

	return (
		<div className="labour-list">
			<h2>Available Labourers</h2>
			{labours.length > 0 ? (
				<div className="labour-container">
					{labours.map((labour, index) => (
						<div className="labour-card" key={index}>
							<img 
								src={labour.image ? labour.image : defaultImage} 
								alt={labour.name || "Labour"} 
								className="labour-image" 
							/>

							<div className="labour-info">
								<h3>{labour.name}</h3>
								<p><strong>Gender:</strong> {labour.gender}</p>
								<p><strong>Labour Name:</strong> {labour.labour_name}</p>
								<p><strong>Service Category:</strong> {labour.work_category || work_category}</p> 
								{/* Use labour.work_category if available, otherwise fallback to passed work_category */}

								<p><strong>Experience:</strong> {labour.experience} </p>
								<button onClick={() => setPopupView("userDetails")}>Get Mobile Number</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No labours available</p>
			)}
			<button className="back-button" onClick={() => navigate("/")}>Back to Search</button>

			{/* Popup for User Details */}
			{popupView === "userDetails" && (
				<div className="popup-overlay">
					<div className="popup-box">
						<h3>Enter Your Details</h3>
						<h4>Personal Details</h4>
						<label> Name:
							<input type="text" name="username" value={userDetails.username} onChange={handleUserDetailsChange} required />
						</label>
						<label> Mobile Number:
							<input type="text" name="mobile" value={userDetails.mobile} onChange={handleUserDetailsChange} required />
						</label>
						<label> Email:
							<input type="text" name="email" value={userDetails.email} onChange={handleUserDetailsChange} required />
						</label>
						<button onClick={() => setPopupView("subscription")}>Next</button>
						<button onClick={() => setPopupView(null)}>Cancel</button>
					</div>
				</div>
			)}

			{/* Popup for Subscription Details */}
			{popupView === "subscription" && (
				<div className="popup-overlay">
					<div className="popup-box">
						<h3>Subscription Details</h3>
						<p>Price: ₹50</p>
						<p>Discount: ₹50</p>
						<p>Final Amount: ₹0</p>
						<button onClick={handlePay} className="pay-button">
							Pay
						</button>
						<button onClick={() => setPopupView(null)}>Cancel</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default LabourList;
