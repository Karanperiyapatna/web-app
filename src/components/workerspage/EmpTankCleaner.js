import React, { useState } from "react";
import axios from "axios";
import "../../styles/EmpBabyCaretaker.css";


import { useNavigate } from "react-router-dom";

const EmpTankcleaner = () => {
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
	});

	const [userDetails, setUserDetails] = useState({
		username: "",
		age: "",
		email: "",
		address: "",
		photo: null,
		identityCard: null,
		childname: "",
		childage: "",
		childgender: "",
		childhealth: ""
	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleUserDetailsChange = (e) => {
		const { name, value } = e.target;
		setUserDetails({ ...userDetails, [name]: value });
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
	
		// Clear previous data and rebuild it
		data.delete();  // If needed, clear previous entries
		for (const key in completeData) {
			data.append(key, completeData[key]);
		}
	
		try {
			const response = await axios.post(
				'http://127.0.0.1:8000/api/EmpTankcleaner/',
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
				alert('Form submitted successfully! ' + response.data.message);
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
			<h2>Baby Caretaker Registration Form</h2>
			<h4>Personal Details</h4>
			<label>
				Full Name:
				<input
					type="text"
					name="username"
					value={userDetails.username}
					onChange={handleUserDetailsChange}
					required
				/>
			</label>

			<label>
				Age:
				<input
					type="number"
					name="age"
					value={userDetails.age}
					onChange={handleUserDetailsChange}
					required
				/>
			</label>

			<label>
				Email:
				<input
					type="text"
					name="email"
					value={userDetails.email}
					onChange={handleUserDetailsChange}
					required
				/>
			</label>

			<label>
				Address:
				<input
					type="text"
					name="address"
					value={userDetails.address}
					onChange={handleUserDetailsChange}
					required
				/>
			</label>

			<div>
				<label> Upload Photo:
					<input type="file" name="photo" accept="image/*" onChange={handlePhotoUpload} required />
				</label>
			</div>

			<div>
				<label> Identity Card:
					<input type="file" name="identityCard" accept="image/*" onChange={handlePhotoUpload} required />
				</label>
			</div>


			<label>
				Username:
				<input
					type="username"
					name="username"
					value={formData.username}
					onChange={handleFormChange}
					required
				/>
			</label>

			<label>
				Password:
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleFormChange}
					required
				/>
			</label>

			<label>
				Gender:
				<select name="urgency" value={formData.urgency} onChange={handleFormChange} required>
					<option value="">Select</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Others">Others</option>
				</select>
			</label>

			<label>
				Working Hours Per Day:
				<input
					type="text"
					name="duration"
					placeholder="In Months"
					value={formData.duration}
					onChange={handleFormChange}
					required
				/>
			</label>

			<label>
				City:
				<select name="careLocation" value={formData.careLocation} onChange={handleFormChange} required>
					<option value="">Select City</option>
					<option value="mysore">Mysore</option>
					<option value="bangalore">Bangalore</option>
					<option value="chennai">Chennai</option>
				</select>
			</label>
			<label>
				Working Area:
				<select name="area" value={formData.area} onChange={handleFormChange} required>
					<option value="">Select Area</option>
					{formData.careLocation && areaOptions[formData.careLocation.toLowerCase()].map((area) => (
						<option key={area} value={area}>{area}</option>
					))}
				</select>
			</label>


			<label>
				Availability:
				<select
					name="availability"
					value={formData.availability}
					onChange={handleFormChange}
					required
				>
					<option value="">Select</option>
					<option value="Morning">Morning</option>
					<option value="Afternoon">Afternoon</option>
					<option value="Full Time">Full Time</option>
				</select>
			</label>

			<label>
				Language:
				<input
					type="text"
					name="specificPreferencesLanguage"
					placeholder="Hindi, English, Kannada etc"
					value={formData.specificPreferencesLanguage}
					onChange={handleFormChange}
					required
				/>
			</label>

			<label>
				Hourly Rate (₹):
				<input
					type="number"
					name="hourlyRate"
					value={formData.hourlyRate}
					onChange={handleFormChange}
					placeholder="e.g., 150"
					required
				/>
			</label>
			<label>
				Experience:
				<select
					name="Experience"
					value={formData.experience}
					onChange={handleFormChange}
					required
				>
					<option value="">Select</option>
					<option value="0-1 year">0-1 year</option>
					<option value="1-3 year">1-3 year</option>
					<option value="3-6year">3-6 year</option>
					<option value="6+ year">6+ year</option>

				</select>
			</label>

			<label>
				Specific Requirements:
				<textarea
					name="specificRequirements"
					placeholder="Enter any specific requirements..."
					value={formData.specificRequirements}
					onChange={handleFormChange}
				/>
			</label>

			<button type="submit" className="submit-button">
				Submit
			</button>
		</form>
	);
};

export default EmpTankcleaner;
