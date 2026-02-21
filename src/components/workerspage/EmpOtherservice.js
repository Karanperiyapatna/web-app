// Checking GitHub Push Origin Main command on 21022026 - Ignore it

import React, { useState } from "react";
import axios from "axios";
import "../../styles/EmpBabyCaretaker.css";
// import "../../styles/OtherServices.css";
import { useNavigate } from "react-router-dom";

const EmpOtherservice = () => {

	const navigate = useNavigate();
	const areaOptions = {
		mysore: ["JP Nagar", "Kuvempunagr"],
		bangalore: ["Banashankari", "Vijayanagar"],
		chennai: ["Aramadai"]
	};

	const [formData, setFormData] = useState({
		urgency: "",
		gender: "",
		workingHours: "",
		specificRequirement: "",
		OtherServices : "",
	});

	const [userDetails, setUserDetails] = useState({
		name: "",
		age: "",
		mobilenumber: "",
		email: "",
		address: "",
		photo: null,
		identityCard: null,
		username: "",
		password: "",
		
	  });
	  

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleUserDetailsChange = (e) => {
		const { name, value } = e.target;
		setUserDetails((prevDetails) => ({
		  ...prevDetails,
		  [name]: value,
		}));
	};
	  

	const handlePhotoUpload = (e) => {
		const { name, files } = e.target;
		setUserDetails({ ...userDetails, [name]: files[0] });
	};

	
	// Create a FormData object to handle file uploads
	const data = new FormData();
	const handleSubmit = async (e) => {
		e.preventDefault();
	
		// Combine user details and form data into one payload
		const completeData = { ...formData, ...userDetails };

		for (const key in completeData) {
			data.append(key, completeData[key]);
		}
	
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/employees/labour-otherservice/`,
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					},
				}
			);
	
			// Check if the request was successful
			if (response.status === 200 || response.status === 201) {
				console.log("Search Results:", response.data);
				navigate("/", { state: { labours: response.data.labours } });
				alert(response.data.message);
			} else {
				console.error("Error:", response.data.error);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('There was an error submitting your request.');
		}
	};

	return (

		<form className="requirement-form" onSubmit={handleSubmit}>
			<h2>Labour Registration Form</h2>
			<h4>Personal Details</h4>
			<label> Name:
				<input type="text" name="name" value={userDetails.name} onChange={handleUserDetailsChange} required />
			</label>

			<label> Mobile Number:
					<input type="number" name="mobilenumber" value={userDetails.mobilenumber} onChange={handleUserDetailsChange} required />
			</label>
			<label> Email:
				<input type="text" name="email" 
					value={userDetails.email} onChange={handleUserDetailsChange} required />
			</label>

			<label> Address:
				<input type="text" name="address" value={userDetails.address} onChange={handleUserDetailsChange} required />
			</label>

            <label> Gender:
				<select name="gender" value={formData.gender} onChange={handleFormChange} required>
					<option value="">Select</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Others">Others</option>
				</select>
			</label>

            <label> Age:
				<input
					type="number" name="age" value={userDetails.age} onChange={handleUserDetailsChange} required />
			</label>

			<div>
				<label> Upload Photo:
					<input type="file" name="photo" accept="image/*" onChange={handlePhotoUpload} required />
				</label>
			</div>

			<div>
				<label> Upload Identity Card:
					<input type="file" name="identityCard" accept="image/*" onChange={handlePhotoUpload} required />
				</label>
			</div>

            <h4>Professional Details</h4>
            <label> Working Service Provide:
				<select name="service" value={formData.service} onChange={handleFormChange} required>
					<option value="">Select Work</option>
					<option value="ac-repair">AC Reapir</option>
					<option value="cardriver">Car Driver</option>
					<option value="electricalworker">Electrical Worker</option>
					<option value="helper">Helper</option>
					<option value="gardening">Gardening</option>
					<option value="lifeinsuranceagent">Life Insurance Agent</option>
					<option value="vehicleinsuranceagent">Vehicle Insurance Agent</option>
					<option value="drinkingwatersupplier">Drinking watersupplier</option>
					<option value="babycaretaker">Baby Caretaker</option>
					<option value="eldercaretaker">Elder Caretaker</option>
					<option value="housekeeping">House Keeping</option>
					<option value="cooking">Cooking</option>
					<option value="tankcleaner">Tank Cleaner</option>
				</select>
			</label>

			<label> Hourly Rate (₹):
				<input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleFormChange} placeholder="e.g., 150" required />
			</label>

			<label> City:
				<select name="careLocation" value={formData.careLocation} onChange={handleFormChange} required>
					<option value="">Select City</option>
					<option value="mysore">Mysore</option>
					<option value="bangalore">Bangalore</option>
					<option value="chennai">Chennai</option>
				</select>
			</label>
			<label> Working Area:
				<select name="area" value={formData.area} onChange={handleFormChange} required>
					<option value="">Select Area</option>
					{formData.careLocation && areaOptions[formData.careLocation.toLowerCase()].map((area) => (
						<option key={area} value={area}>{area}</option>
					))}
				</select>
			</label>

			<label> Working availability:
				<select name="availability" value={formData.availability}  onChange={handleFormChange} required >
					<option value="">Select</option>
					<option value="Morning">Morning</option>
					<option value="Afternoon">Afternoon</option>
					<option value="Full Time">Full Time</option>
				</select>
			</label>

			<label> Language:
				<input
					type="text" name="specificPreferencesLanguage" placeholder="Hindi, English, Kannada etc" value={formData.specificPreferencesLanguage} onChange={handleFormChange} required />
			</label>

			<label> Experience:
				<select name="Experience"
					value={formData.experience}
					onChange={handleFormChange}
					required >
					<option value="">Select</option>
					<option value="0-1 year">0-1 year</option>
					<option value="1-3 year">1-3 year</option>
					<option value="3-6year">3-6 year</option>
					<option value="6+ year">6+ year</option>
				</select>
			</label>

			<label> Specific Requirements: 		
				<textarea name="specificRequirements" placeholder="Enter any specific requirements..." 	value={formData.specificRequirements} 	onChange={handleFormChange} />
			</label>

			<button type="submit" className="submit-button">
				Submit
			</button>
		</form>
	);
};

export default EmpOtherservice;
