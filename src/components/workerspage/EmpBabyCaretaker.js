// This component renders a registration form for baby caretakers. It collects personal details, work preferences, and other relevant information from the user. The form data is managed using React's useState hook, and upon submission, it sends the data to the backend API using axios. The component also handles file uploads for photos and identity cards, and it includes checkboxes for handling work and availability. Depending on the user's selection for how they are registering (directly, via agent, or via labour), it conditionally renders additional input fields for agent or labour IDs. After successful submission, it navigates the user to the home page with the search results.

import React, { useState } from "react";
import axios from "axios";
import "../../styles/EmpBabyCaretaker.css";
import { useNavigate } from "react-router-dom";

const EmpBabyCaretaker = () => {

	const navigate = useNavigate();

	const areaOptions = {
		mysore: ["JP Nagar", "Kuvempunagr"],
		bangalore: ["Banashankari", "Vijayanagar"],
		chennai: ["Aramadai"]
	};


	const [formData, setFormData] = useState({
		name : "",
		mobilenumber: "",
		email: "",
		gender: "",
		age: "",
		address: "",
		photo: "",
		identityCard: "",
		username: "",
		password :"",
		city: "",
		area: "",
		handling: [],
		availability : [],
		language: "",
		hourlyRate : "",
		experience :"",
		refer :"",
		agentId: "",
		labourId: "",
		workdescription: "",
		agreedToTerms: "",

	});

	// const handleFormChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormData({ ...formData, [name]: value });
	// };
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
			// Clear IDs if refer changes
			...(name === "refer" ? { agentId: "", labourId: "" } : {})
		}));
	};

	// const handleExtraIdChange = (e) => {
	// 	setFormData((prev) => ({
	// 	  ...prev,
	// 	  extraId: e.target.value,
	// 	}));
	// };
	
	const handleExtraIdChange = (e) => {
		const value = e.target.value;
		if (formData.refer === "Via Agent") {
			setFormData((prevData) => ({ ...prevData, agentId: value }));
		} else if (formData.refer === "Via Labour") {
			setFormData((prevData) => ({ ...prevData, labourId: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		// Create a FormData object to handle file uploads
		const data = new FormData();
			// Add all general fields
		Object.keys(formData).forEach((key) => {
			if (!['agentId', 'labourId', 'refer'].includes(key)) {
				data.append(key, formData[key]);
			}
		});

		// Append reference ID based on refer method
		if (formData.refer === "Via Agent" && formData.agentId) {
			data.append("referred_via_agent", formData.agentId);
		} else if (formData.refer === "Via Labour" && formData.labourId) {
			data.append("referred_via_labour", formData.labourId);
		}


		for (const key in formData) {
			data.append(key,  formData[key]);
		}
	
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/employees/baby-caretaker/`,
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

	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target;
		setFormData((prevData) => {
		  const updatedHandling = checked
			? [...prevData.handling, value]
			: prevData.handling.filter((item) => item !== value);
		  return { ...prevData, handling: updatedHandling };
		});
	};
	
	const availabilityCheckboxChange = (e) => {
		const { value, checked } = e.target;
		setFormData((prevData) => {
		  const updatedHandling = checked
			? [...prevData.availability, value]
			: prevData.availability.filter((item) => item !== value);
		  return { ...prevData, availability: updatedHandling };
		});
	};

	
	const handlePhotoUpload = (e) => {
		const { name, files } = e.target;
		setFormData({ ...formData, [name]: files[0] });
	};



	return (

		<form className="requirement-form" onSubmit={handleSubmit}>
			<h2>Baby Caretaker Labour Registration Form</h2>
			<h4>Personal Details</h4>
			<label> Name:
				<input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
			</label>
			<label> Mobile Number:
				<input type="number" name="mobilenumber" value={formData.mobilenumber} onChange={handleFormChange} required />
			</label>
			<label> Email ID: 
					<input type="text" name="email" value={formData.email} onChange={handleFormChange} required />
			</label>

			<label>
				Gender:
				<select name="gender" value={formData.gender} onChange={handleFormChange} required>
					<option value="">Select</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Others">Others</option>
				</select>
			</label>
			<label> Age:
				<input type="number" name="age" value={formData.age} onChange={handleFormChange} required />
			</label>
			<label> Address:
						 <input type="text" name="address" value={formData.address} onChange={handleFormChange} required />
			</label>

			<div>
				<label> Photo:
					<input type="file" name="photo" accept="image/*" onChange={handlePhotoUpload} required />
				</label>
			</div>
			<div>
				<label> Identity Card:
					<input type="file" name="identityCard" accept="image/*" onChange={handlePhotoUpload} required />
				</label>
			</div>


			<label> Username:
				<input type="text" name="username" value={formData.username} onChange={handleFormChange} required />
			</label>
			<label> Password:
				<input type="password" name="password" value={formData.password} onChange={handleFormChange} required />
			</label>
			<label>
				City:
				<select name="city" value={formData.city} onChange={handleFormChange} required>
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
					{formData.city && areaOptions[formData.city.toLowerCase()].map((area) => (
						<option key={area} value={area}>{area}</option>
					))}
				</select>
			</label>


			<h4>Handling Work</h4>
					<div className = "checkbox-container">
						<div>
						{[
						"Changing Diapers",
						"Cleaning Utensils of Baby", 
						"Feeding" ,
						"Preparing baby for sleep",
						"Taking Baby for walk",
						"Baby complete Care taking From 8am-6pm",
						"Bathing and Dressing the Baby",
						"Sterilizing Baby Bottles and Pacifiers",
						"Preparing Baby Food/Milk",
						"Soothing and Rocking the Baby to Sleep",
						"Engaging in Playtime Activities",
						"Reading Stories or Singing Lullabies",
						"Monitoring Baby’s Health and Hygiene",
						"Washing Baby’s Clothes and Bedding",
						"Organizing Baby’s Toys and Essentials",
						"Maintaining Sleep and Feeding Schedules",
						"Assisting in Early Learning Activities",
						"Ensuring Baby’s Safety at Home",
						].map((task, index) => (
						<label key={index}>
							<input
							type="checkbox"
							value={task}
							checked={formData.handling.includes(task)}
							onChange={handleCheckboxChange}
							/>
							{task}
						</label>
						))}
				</div>
			</div>

			<h4>Availability</h4>
					<div className = "checkbox-container">
						<div>
						{[
						"Morning",
						"Afternoon", 
						"Evening" ,
						"Full Time",
		
						].map((task, index) => (
						<label key={index}>
							<input
							type="checkbox" value={task} checked={formData.availability.includes(task)} onChange={availabilityCheckboxChange} />
							{task}
						</label>
						))}
				</div>
			</div>

			<label>
				Language:
				<input type="text" name="language" placeholder="Hindi, English, Kannada etc" value={formData.language} onChange={handleFormChange} required />
			</label>

			<label>
				Charge Per Hour (₹):
				<input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleFormChange} placeholder="e.g., 150" required />
			</label>
			<label>
				Experience:
				<select name="experience" value={formData.experience} onChange={handleFormChange} required >
					<option value="">Select</option>
					<option value="1">0-1 year</option>
					<option value="2">1-2 year</option>
					<option value="3">2-3 year</option>
					<option value="6">3-6 year</option>
					<option value="above">6+ year</option>

				</select>
			</label>
			<label>
				Registering Via:
				<select name="refer" value={formData.refer} onChange={handleFormChange} required>
					<option value="">Select</option>
					<option value="Direct">Direct</option>
					<option value="Via Agent">Via Agent</option>
					<option value="Via Labour">Via Labour</option>
				</select>
			</label>

			{/* Show input only if not Direct */}
			{formData.refer === "Via Agent" && (
				<label>
					Agent ID:
					<input
						type="text"
						name="extraId"
						value={formData.agentId}
						onChange={handleExtraIdChange}
						required
					/>
				</label>
			)}

			{formData.refer === "Via Labour" && (
				<label>
					Labour ID:
					<input
						type="text"
						name="extraId"
						value={formData.labourId}
						onChange={handleExtraIdChange}
						required
					/>
				</label>
			)}

			<label>
				Work Specialization:
				<textarea name="workdescription" placeholder="Enter your work description..." value={formData.workdescription} onChange={handleFormChange} />
			</label>

			<div className="form-check mb-1 d-flex align-items-center">
				<input 
					className="form-check-input me-3"
					type="checkbox"
					name="agreedToTerms"
					checked={formData.agreedToTerms}
					onChange={(e) =>
						setFormData((prevData) => ({
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

			<button type="submit" className="submit-button">
				Submit
			</button>
		</form>
	);
};

export default EmpBabyCaretaker;
