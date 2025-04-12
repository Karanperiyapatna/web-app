import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/BabyCaretaker.css"; 


const Cleaner = () => {

	const [isPosting, setIsPosting] = useState(false);

  // Ensure labours is properly initialized as an array in state

	const navigate = useNavigate();
	const areaOptions = {
			mysore: ["JP Nagar", "Kuvempunagar"],
			bangalore: ["Banashankari", "Vijayanagar"],
			chennai: ["Aramadai"]
	};


	const [formData, setFormData] = useState({
		username :"",
		mobilenumber : "",
		email : "",
		address : "",
		city: "",
		area: "",
		language : "",
		gender: "",
		duration :"",
		urgency: "",
		handling: [],
		preferredworkTime :"",
		additionalNotes :"",
		salaryOffered : "",

	});

	// State for searching labour
	const [searchCriteria, setSearchCriteria] = useState({
		gender: "",
		city: "",
		area: "",
	});

	// Handle form input changes
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	// Handle checkbox change for baby_care_tasks
	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			handling: checked
				? [...prevData.handling, value]
				: prevData.handling.filter((task) => task !== value),
		}));
	};

	// Handle search form input changes
	const handleFormChangeCheckLabour = (e) => {
		const { name, value } = e.target;
		setSearchCriteria((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};




	const [popupView, setPopupView] = useState(null); // Tracks the current popup view

	const handleUserDetailsChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};


	// cleaning.js
	const handleSearchCheckLabour = async (e) => {
		e.preventDefault();
	
		if (!searchCriteria.gender || !searchCriteria.city || !searchCriteria.area) {
			alert("Please fill all fields before searching");
			return;
		}
	
		try {
			const requestBody = {
				...searchCriteria,
				work_category: "cleaner" 
			};
			
			const response = await fetch(
				`${process.env.API_BASE_URL}/api/search/labour-cleaner/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody),
			});
	
			const data = await response.json();
	
			if (response.ok) {
				console.log("Search Results:", data);
				navigate("/labour-list", { state: { labours: data.labours,  work_category: "Cleaner" } });
			} else {
				console.error("Error:", data.error);
			}
		} catch (error) {
			console.error("Request failed:", error);
		}
	};
	
  
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create a FormData object to handle file uploads
		const data = new FormData();
		
		// Append form fields to FormData
		Object.keys(formData).forEach((key) => {
			data.append(key, formData[key]);
		});

		try {
			const response = await axios.post(
				`${process.env.API_BASE_URL}/api/requirements/cleaner/`, // Django API URL
				data,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					},
				}
			);
			if (response.status === 201) {
				// Create a popup dynamically
				const popup = document.createElement('div');
				popup.innerHTML = `
					<div class="popup-overlay">
						<div class="popup-box">
							<h3>We will get back to you shortly!</h3>
							<p>Thank you for contacting us.</p>
							<button id="closePopup">Close</button>
						</div>
					</div>
				`;
		
				// Append to the body
				document.body.appendChild(popup);
		
				// Add event listener to close button
				document.getElementById('closePopup').addEventListener('click', () => {
					window.location.href = "/"; // Redirect to home page
				});
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('There was an error submitting your request.');
		}
	};

	const handlePay = () => {
		window.location.href = "/payment";   // Redirect to the payment page
	};


	 
	return (
		<div className="baby-caretaker-container">
			<h2>Cleaner/House Keeping</h2>
            <div className="options-container">
                <button className="option-button" onClick={() => setIsPosting(true)}>Post Your Requirement</button>
                <button className="option-button" onClick={() => setIsPosting(false)}>Check Labour</button>
            </div>

			{isPosting ? (
				<form className="requirement-form" onSubmit={handleSubmit}>
					<h2>Post Your Requirement</h2>
					<h4>Personal Details</h4>
					<div>
						<label> Name:
							<input type="text" 	name="username" value={formData.username} onChange={handleUserDetailsChange} required />
						</label>
						<label> Mobile Number:
							<input type="number" name="mobilenumber" value={formData.mobilenumber} onChange={handleUserDetailsChange} required />
						</label>
						<label> Email: 
							<input type="text" name="email" value={formData.email} onChange={handleUserDetailsChange} required />
						</label>
						<label> Address:
						 <input type="text" name="address" value={formData.address} onChange={handleUserDetailsChange} required />
						</label>

						<h5>Preffered Housekeeping Details</h5>
						<label> City:
							<select name="city" value={formData.city} onChange={handleFormChange} required>
								<option value="">Select City</option>
								<option value="mysore">Mysore</option>
								<option value="bangalore">Bangalore</option>
								<option value="chennai">Chennai</option>
							</select>
						</label>
						<label> Area:
							<select name="area" value={formData.area} onChange={handleFormChange} required>
								<option value="">Select Area</option>
								{formData.city && areaOptions[formData.city.toLowerCase()].map((area) => (
									<option key={area} value={area}>{area}</option>
								))}
							</select>
						</label>

						<label>Preferences Language:
								<input type="text" name="language" placeholder="Hindi, English, Kannada etc" value={formData.language} onChange={handleFormChange} required />
						</label>

						<label>Gender:
								<select name="gender" value={formData.gender} onChange={handleFormChange} required>
									<option value="">Select</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Others">Others</option>
								</select>
						</label>

					</div>
					<h4>Handling</h4>
					<div className = "checkbox-container">
						<div>
						{[
						"Bathroom cleaning",
						"Cloth washing (with washing machine)",
						"Cloth washing (by hand)",
						"Floor cleaning",
						"Grocery shopping",
						].map((task, index) => (
						<label key={index}>
							<input type="checkbox" value={task} checked={formData.handling.includes(task)} 	onChange={handleCheckboxChange}
							/>
							{task}
						</label>
						))}
					</div>

					</div>

					<div>
						<label> Urgency:
							<select name="urgency" value={formData.urgency} onChange={handleFormChange} required>
								<option value="">Select</option>
								<option value="Urgent">Urgent</option>
								<option value="Within 1 Week">Within 1 Week</option>
								<option value="Just Enquiry">Just Enquiry</option>
							</select>
						</label>
						<label>
						Preferred Care Time:
						<select name="preferredworkTime" value={formData.preferredworkTime} onChange={handleFormChange} required>
							<option value="">Select</option>
							<option value="morning_shift">Morning - 6am to 10am</option>
									<option value="evening_shift">Evening - 5pm 9pm</option>
									<option value="partial_shift">Partial 12hrs</option>
									<option value="full_shift">Full Time 24hrs</option>
						</select>
						</label>
						<label>	Duration:
								<input type="text" name="duration" placeholder="In Months" value={formData.duration} onChange={handleFormChange} required />
						</label>


						<label> Additional Notes:
							<textarea name="additionalNotes" placeholder="Enter any specific requirements..."
								value={formData.additionalNotes}
								onChange={handleFormChange}
							/>
						</label>
						<label> Salary Offer:
							<input
								type="text" name="salaryOffered" placeholder="Per Month Ex. 1000rs/month" value={formData.salaryOffered} onChange={handleFormChange} required />
						</label>



					</div>
	
					<button type="submit" className="submit-button">
						Submit
					</button>

					{popupView === "formData" && (
						<div className="popup-overlay">
							<div className="popup-box">
								<h3>Enter Your Details</h3>
								<h4>Personal Details</h4>
								<label>	Name:
									<input type="text" name="username" value={formData.username} onChange={handleUserDetailsChange} required />
								</label>
								<label> Mobile Number:
									<input type="text" name="mobile" value={formData.mobile} onChange={handleUserDetailsChange} required />
								</label>
								<label> Email:
									<input type="text" name="email" value={formData.email} onChange={handleUserDetailsChange} required />
								</label>
								<button onClick={() => setPopupView("subscription")}>Next</button>
							</div>
						</div>
					)}

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
							</div>
						</div>
					)}
				</form>

			) : (

				<div>
				<form className="requirement-form"  onSubmit={handleSearchCheckLabour}>
					<h2>Check Labour</h2>
					<label> Gender:
						<select name="gender" value={searchCriteria.gender} onChange={handleFormChangeCheckLabour} required >
							<option value="">Select</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
					</label>
					<label> City:
						<select name="careLocation" value={searchCriteria.careLocation} onChange={handleFormChangeCheckLabour} required >
							<option value="">Select City</option>
							<option value="mysore">Mysore</option>
							<option value="bangalore">Bangalore</option>
							<option value="chennai">Chennai</option>
						</select>
					</label>
					<label> Area:
						<select name="area" value={searchCriteria.area} onChange={handleFormChangeCheckLabour} required >
							<option value="">Select Area</option>
							{searchCriteria.careLocation &&
								areaOptions[searchCriteria.careLocation.toLowerCase()].map((area) => (
									<option key={area} value={area}>
										{area}
									</option>
							))}
						</select>
					</label>
					<button type="submit">Search</button>
				</form>

			</div>
		)}
	</div>
	)
};

export default Cleaner;
