import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/LabourList.css'; 
import defaultImage from "../../src/images/profileicon.png";

// ... import statements remain the same

const LabourList = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { labours, work_category } = location.state || { labours: [], work_category: "N/A" };

	const [popupView, setPopupView] = useState(null);
	const [selectedLabour, setSelectedLabour] = useState(null);
	const [userDetails, setUserDetails] = useState({
		username: "",
		mobile: "",
		email: "",
		agreedToTerms: false,
	});

	const handleUserDetailsChange = (e) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const generateOrderId = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < 6; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	};

	const price = 50;
	const discount = 50;
	const final_price = price - discount;

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
								<p><strong>Experience:</strong> {labour.experience} </p>
								<button onClick={() => {
									setSelectedLabour(labour);
									setPopupView("userDetails");
								}}>
									Get Mobile Number
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-black">No labours available</p>
			)}
			<button className="back-button" onClick={() => navigate("/")}>Back to Search</button>

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
						<div className="form-check mb-1 d-flex align-items-center">
							<input 
								className="form-check-input me-3"
								type="checkbox"
								name="agreedToTerms"
								checked={userDetails.agreedToTerms}
								onChange={(e) =>
									setUserDetails((prevData) => ({
										...prevData,
										agreedToTerms: e.target.checked,
									}))
								}
								id="termsCheck"
								style={{ width: "18px", height: "18px" }}
							/>
							<label className="form-check-label" htmlFor="termsCheck" style={{ marginBottom: 10 }} >
								I agree to the <a href="http://www.digilaboursolutions.com.s3-website.ap-south-1.amazonaws.com/terms-conditions.html" target="_blank" rel="noreferrer">Terms and Conditions</a>
							</label>
						</div>

						<button onClick={() => {
							const order_id = generateOrderId();
							navigate("/payment", {
								state: {
									order_id,
									userDetails,
									selectedLabour: {
										_id : selectedLabour?._id,
										labour_name: selectedLabour?.labour_name,
										labour_id: selectedLabour?.labour_id,
										labour_name: selectedLabour?.labour_name,
										labour_mobile: selectedLabour?.mobile_number,
										register_via: selectedLabour?.register_via,
										referred_by: selectedLabour?.referred_by

									},
									work_category,
									price,
									discount,
									final_price
								}
							});
						}}>Next</button>

						<button onClick={() => setPopupView(null)}>Cancel</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default LabourList;
