import React, { useState } from "react";
import axios from "axios";
import "../../styles/EmpBabyCaretaker.css";
import { useNavigate } from "react-router-dom";

const EmpHelper = () => {
	const navigate = useNavigate();

	const areaOptions = {
		mysore: ["JP Nagar", "Kuvempunagr"],
		bangalore: ["Banashankari", "Vijayanagar"],
		chennai: ["Aramadai"],
	};

	const [formData, setFormData] = useState({
		name: "",
		age: "",
		mobile : "",
		email: "",
		address: "",
		photo: null,
		identityCard: null,
		username : "",
		password: "", // Added missing field
		gender: "",
		urgency: "",
		specificRequirement: "",
		handling: [],
		careLocation: "",
		area: "",
		availability: "",
		specificPreferencesLanguage: "",
		hourlyRate: "",
		experience: "",
	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handlePhotoUpload = (e) => {
		const { name, files } = e.target;
		if (files.length > 0) {
			setFormData({ ...formData, [name]: files[0] });
		}
	};

	const handleCheckboxChange = (e) => {
		const value = e.target.value;
		setFormData((prevData) => ({
			...prevData,
			handling: prevData.handling.includes(value)
				? prevData.handling.filter((task) => task !== value) // Uncheck: remove from array
				: [...prevData.handling, value], // Check: add to array
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();

		// Append form data
		Object.keys(formData).forEach((key) => {
			if (formData[key]) {
				if (key === "photo" || key === "identityCard") {
					data.append(key, formData[key]); // Append file separately
				} else if (Array.isArray(formData[key])) {
					formData[key].forEach((value) => {
						data.append(`${key}[]`, value);
					});
				} else {
					data.append(key, formData[key]);
				}
			}
		});

		try {
			const response = await axios.post("http://127.0.0.1:8000/api/employees/helper/", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200 || response.status === 201) {
				console.log("Search Results:", response.data);
				navigate("/", { state: { labours: response.data.labours } });
				alert("Form submitted successfully! " + response.data.message);
			} else {
				console.error("Error:", response.data.error);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("There was an error submitting your request.");
		}
	};

	return (
		<form className="requirement-form" onSubmit={handleSubmit}>
			<h2>Helper Labour Registration Form</h2>

			<h4>Personal Details</h4>

			<label>
				Full Name:
				<input type="text" name="name" value={formData.name} onChange={handleFormChange} required />
			</label>

			<label>
				Age:
				<input type="number" name="age" value={formData.age} onChange={handleFormChange} required />
			</label>
			<label>
				mobile:
				<input type="number" name="mobile" value={formData.mobile} onChange={handleFormChange} required />
			</label>
			

			<label>
				Email:
				<input type="email" name="email" value={formData.email} onChange={handleFormChange} required />
			</label>

			<label>
				Address:
				<input type="text" name="address" value={formData.address} onChange={handleFormChange} required />
			</label>

			<label>
				Upload Photo:
				<input type="file" name="photo" accept="image/*" onChange={handlePhotoUpload} required />
			</label>

			<label>
				Identity Card:
				<input type="file" name="identityCard" accept="image/*" onChange={handlePhotoUpload} required />
			</label>

			<h4>Service Category</h4>
			<div className="checkbox-container">
				{["Construction Helper", "Logistics Helper", "General Helper"].map((task, index) => (
					<label key={index}>
						<input type="checkbox" value={task} checked={formData.handling.includes(task)} onChange={handleCheckboxChange} />
						{task}
					</label>
				))}
			</div>
			<label>
				Username:
				<input type="username" name="username" value={formData.username} onChange={handleFormChange} required />
			</label>

			<label>
				Password:
				<input type="password" name="password" value={formData.password} onChange={handleFormChange} required />
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
					{formData.careLocation &&
						areaOptions[formData.careLocation.toLowerCase()].map((area) => (
							<option key={area} value={area}>
								{area}
							</option>
						))}
				</select>
			</label>

			<label>
				Availability:
				<select name="availability" value={formData.availability} onChange={handleFormChange} required>
					<option value="">Select</option>
					<option value="Morning">Morning</option>
					<option value="Afternoon">Afternoon</option>
					<option value="Full Time">Full Time</option>
				</select>
			</label>

			<label>
				Language:
				<input type="text" name="specificPreferencesLanguage" value={formData.specificPreferencesLanguage} onChange={handleFormChange} required />
			</label>

			<label>
				Hourly Rate (₹):
				<input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleFormChange} required />
			</label>

			<button type="submit" className="submit-button">
				Submit
			</button>
		</form>
	);
};

export default EmpHelper;
