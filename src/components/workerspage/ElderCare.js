import React, { useState } from "react";
import axios from "axios";
import "../../styles/BabyCaretaker.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const ElderCaretaker = () => {
	const [isPosting, setIsPosting] = useState(false);

	const navigate = useNavigate();
	const areaOptions = {
			mysore: ["JP Nagar", "Kuvempunagar"],
			bangalore: ["Banashankari", "Vijayanagar"],
			chennai: ["Aramadai"]
	};


	const [accountVia, setAccountVia] = useState("Direct"); // Default to Direct
	const [agentOrDemandCode, setAgentOrDemandCode] = useState("");

	const [formData, setFormData] = useState({

		username :"",
		mobilenumber : "",
		email : "",
		address : "",
		city: "",
		area: "",
		language : "",
		age : "",
		gender: "",
		elder_care_tasks :[],
		additionalNotes :"",
		salaryOffered : "",
		urgency: "",
		duration: "",


	});

	const handleAccountTypeChange = (e) => {
        setAccountVia(e.target.value);
        setAgentOrDemandCode(""); // Reset sub-field when type changes
    };


	// Handle form input changes
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
			[e.target.name]: e.target.value,
		}));
	};

	// Handle checkbox change for baby_care_tasks
	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			baby_care_tasks: checked
				? [...prevData.elder_care_tasks, value]
				: prevData.elder_care_tasks.filter((task) => task !== value),
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

	const [searchCriteria, setSearchCriteria] = useState({
		gender: "",
		careLocation: "", // For city
		area: "" // For area
	});

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
				work_category: "eldercaretaker" // Add work_category field with default value
			};
			
			const response = await fetch(
				`${process.env.API_BASE_URL}/api/search/labour-eldercaretaker/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody),
			});
	
			const data = await response.json();
	
			if (response.ok) {
				console.log("Search Results:", data);
				navigate("/labour-list", { state: { labours: data.labours , work_category: "Elder Caretaker"} });
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
		    // Ensure agentOrDemandCode is added correctly
		if (accountVia === "Agent" || accountVia === "Demand") {
				data.append("agentOrDemandCode", agentOrDemandCode);
		}
		


		try {
			const response = await axios.post(
				`${process.env.API_BASE_URL}/api/requirements/elder-caretaker/`,// Django API URL
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
			<h2>Elder Caretaker Form</h2>
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


						<h4>Elder Details</h4>
						<label> Elder Age:
							<input  type="number" name="age" value={formData.age} onChange={handleUserDetailsChange} required />
						</label>

						<label>Elder Gender:
								<select name="gender" value={formData.gender} onChange={handleFormChange} required>
									<option value="">Select</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Others">Others</option>
								</select>
						</label>

					</div>

					<h4 className="text-secondary">Handling</h4>
					<div className = "mb-3">
						{[
						"Assisting with Bathing and Personal Hygiene",
						"Helping with Dressing and Grooming",
						"Preparing and Serving/Feeding Meals", 
						"Administering Medication as per Schedule",
						"Assisting with Mobility and Walking",
						"Providing Light Exercises and Stretching Assistance",
						"Organizing and Managing Household Supplies",
						].map((type, index) => (
						<div key={index} className="d-flex justify-content-between align-items-center mb-2">
							<label className="form-check-label mb-0">{type}</label>
							<input
							type="checkbox"
							className="form-check-input" 
							value={type}
							style={{ width: "20px", height: "20px", marginLeft: "10px" }} 
							checked={formData.elder_care_tasks.includes(type)}
							onChange={handleCheckboxChange}
							/>
						</div>
						))}
					</div>


					
					<h4>Service Requirements</h4>
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
						<select name="preferredCareTime" value={formData.preferredCareTime} onChange={handleFormChange} required>
							<option value="">Select</option>
							<option value="Full Time 24hrs">Full Time 24hrs</option>
							<option value="Partial 12hrs">Partial 12hrs</option>
							<option value="Morning - 6am to 10am">Morning - 6am to 10am</option>
							<option value="Evening - 5pm 9pm">Evening - 5pm 9pm</option>
						</select>
						</label>
						<label>	Duration:
								<input type="text" name="duration" placeholder="In Months" value={formData.duration} onChange={handleFormChange} required />
						</label>
						<label> City:
							<select name="careLocation" value={formData.careLocation} onChange={handleFormChange} required>
								<option value="">Select City</option>
								<option value="mysore">Mysore</option>
								<option value="bangalore">Bangalore</option>
								<option value="chennai">Chennai</option>
							</select>
						</label>
						<label> Area:
							<select name="area" value={formData.area} onChange={handleFormChange} required>
								<option value="">Select Area</option>
								{formData.careLocation && areaOptions[formData.careLocation.toLowerCase()].map((area) => (
									<option key={area} value={area}>{area}</option>
								))}
							</select>
						</label>
						<label>Additional Notes:
								<input type="text" name="language" placeholder="Hindi, English, Kannada etc" value={formData.language} onChange={handleFormChange} required />
						</label>
						<label> :
							<textarea name="additionalNotes" placeholder="Enter any specific requirements..."
								value={formData.additionalNotes}
								onChange={handleFormChange}
							/>
						</label>
						<label> Salary Offer:
							<input
								type="text" name="salaryOffered" placeholder="Salary Offer" value={formData.salaryOffered} onChange={handleFormChange} required />
						</label>
									{/* Account Type Selection */}
								

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
export default ElderCaretaker;
