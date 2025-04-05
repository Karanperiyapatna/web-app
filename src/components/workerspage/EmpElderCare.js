import React, { useState } from "react";
import axios from "axios";
import "../../styles/EmpBabyCaretaker.css";


import { useNavigate } from "react-router-dom";
	

const EmpElderCaretaker = () => {
	const navigate = useNavigate();

	const areaOptions = {
		mysore: ["JP Nagar", "Kuvempunagr"],
		bangalore: ["Banashankari", "Vijayanagar"],
		chennai: ["Aramadai"]
	};


	const [formData, setFormData] = useState({
		name : "",
		mobilenumber : "",
		email : "",
		gender:"",
		age : "",
		address: "",
		photo: null,
		identityCard: null,
		username: "",
		password:"",
		city : "",
		area:"",
		handling: [],
		availability : [],
		language: "",
		hourlyRate : "",
		experience:"",
		refer :"",
    	extraId: "",
		workdescription: "",

	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
	
		setFormData((prev) => ({
			...prev,
			[name]: value,
			// Reset extraId if Direct is selected
			extraId: name === "refer" && (value === "direct") ? "" : prev.extraId,
		}));
	};

	const handleExtraIdChange = (e) => {
		setFormData((prev) => ({
		  ...prev,
		  extraId: e.target.value,
		}));
	  };


	const handleFileUpload = (e) => {
		const { name, files } = e.target;
		setFormData({ ...formData, [name]: files[0] });
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
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Create a new FormData object
		const data = new FormData();
	
		// Combine user details and form data into one payload
		// const completeData = { ...formData, ...userDetails };
	
		// for (const key in completeData) {
		// 	if (completeData[key] !== null && completeData[key] !== undefined) {
		// 		data.append(key, completeData[key]);
		// 	}
		// }
		
		for (const key in formData) {
			data.append(key,  formData[key]);
		}
	
		try {
			const response = await axios.post(
				
				'http://127.0.0.1:8000/api/employees/elder-caretaker/',
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
			<h2>Elder Caretaker Labour Registration Form</h2>
			<h4>Personal Details</h4>
			<label>
				Full Name:
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleFormChange}
					required
				/>
			</label>
			<label> Mobile Number:
				<input type="number" name="mobilenumber" value={formData.mobilenumber} onChange={handleFormChange} required />
			</label>

			<label>
				Email:
				<input
					type="text"
					name="email"
					value={formData.email}
					onChange={handleFormChange}
					required
				/>
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

			<label>
				Age:
				<input
					type="number"
					name="age"
					value={formData.age}
					onChange={handleFormChange}
					required
				/>
			</label>

			<label>
				Address:
				<input type="text" name="address" value={formData.address} onChange={handleFormChange} required />
			</label>

			<div>
				<label> Upload Photo:
					<input type="file" name="photo" accept="image/*" onChange={handleFileUpload} required />
				</label>
			</div>

			<div>
				<label> Identity Card:
					<input type="file" name="identityCard" accept="image/*" onChange={handleFileUpload} required />
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

			<h4>Handling</h4>
					<div className = "checkbox-container">
						<div>
						{[
						"Assisting with Bathing and Personal Hygiene",
						"Helping with Dressing and Grooming",
						"Preparing and Serving/Feeding Meals", 
						"Administering Medication as per Schedule",
						"Assisting with Mobility and Walking",
						"Providing Light Exercises and Stretching Assistance",
						"Organizing and Managing Household Supplies",
												
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
							type="checkbox"
							value={task}
							checked={formData.availability.includes(task)}
							onChange={availabilityCheckboxChange}
							/>
							{task}
						</label>
						))}
				</div>
			</div>

			<label>
				Language:
				<input
					type="text" name="language" placeholder="Hindi, English, Kannada etc" value={formData.language} onChange={handleFormChange} required />
			</label>

			<label>
				Charge Per Hour (₹):
				<input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleFormChange} placeholder="e.g., 150" required />
			</label>
			<label>
				Experience:
				<select
					name="experience" value={formData.experience} onChange={handleFormChange} required >
					<option value="">Select</option>
					<option value="0-1 year">0-1 year</option>
					<option value="1-3 year">1-3 year</option>
					<option value="3-6year">3-6 year</option>
					<option value="6+ year">6+ year</option>

				</select>
			</label>

			<label>
				Registering Via:
				<select name="refer" value={formData.refer} onChange={handleFormChange} required >
					<option value="">Select</option>
					<option value="direct">Direct</option>
					<option value="reference">Reference</option>
				</select>
			</label>
			{/* Show input box if "Agent" or "Demant" is selected */}
			{formData.refer === "reference" && (
			<label>
				Reference ID:
				<input type="text" name="extraId" value={formData.extraId} onChange={handleExtraIdChange} required />
				</label>
			)}


			<label>
				Work Description:
				<textarea name="workdescription" placeholder="Enter your work description..." value={formData.workdescription} onChange={handleFormChange}	/>
			</label>

			<button type="submit" className="submit-button">
				Submit
			</button>
		</form>
	);
};

export default EmpElderCaretaker;
