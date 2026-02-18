
import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom"; 
import "../../styles/BabyCaretaker.css"; // Import CSS for styling

const BabyCaretaker = () => {
	const [isPosting, setIsPosting] = useState(false);

	const navigate = useNavigate();
	const areaOptions = {
			mysore: ["JP Nagar", "Kuvempunagar"],
			bangalore: ["Banashankari", "Vijayanagar"],
			chennai: ["Aramadai"]
	};


	const [formData, setFormData] = useState({
		name :"",
		mobilenumber : "",
		alternative_mobile_number :"",

		email : "",
		address : "",
		pincode:"", 
		city: "",
		area: "",
		language : "",

		age: "",
		gender: "",
		preferredCareTime : "",
		baby_care_tasks :[],
		preferredgender : "",
		additionalNotes :"",
		salaryOffered : "",
		agreedToTerms: "",

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
			baby_care_tasks: checked
				? [...prevData.baby_care_tasks, value]
				: prevData.baby_care_tasks.filter((task) => task !== value),
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
				work_category: "babycaretaker" // Add work_category field with default value
			};
			console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);
	
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/api/search/labour-babycaretaker/`,
				{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody),
			});
			const responseText = await response.text();
			console.log("Raw Response:", responseText);
	
			// const data = await response.json();

			let data;
			try {
				data = JSON.parse(responseText);
			} catch (jsonError) {
				console.error("Failed to parse JSON. Possibly an HTML error page was returned.", jsonError);
				return;
			}
	
	
			if (response.ok) {
				console.log("Search Results:", data);
				navigate("/labour-list", { state: { labours: data.labours , work_category: "Baby Caretaker"} });
			} else {
				console.error("Error:", data.error);
			}
		} catch (error) {
			console.error("Request failed:", error);
		}
	};
	
  
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.agreedToTerms) {
			alert("You must agree to the Terms and Conditions before submitting.");
			return;
		}

		// Proceed with submission
		console.log("Submitting form with data:", formData);

		// Create a FormData object to handle file uploads
		const data = new FormData();

		// Clone the formData and convert agreedToTerms to 'agree' if checked
		const modifiedFormData = {
			...formData,
			agreedToTerms: formData.agreedToTerms ? "agree" : "",
		};
		
		// Append form fields to FormData
		Object.keys(modifiedFormData).forEach((key) => {
			data.append(key, modifiedFormData[key]);
		});


		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/requirements/baby-caretaker/`, // Django API URL
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
			<h2>Baby Caretaker Form</h2>
            <div className="options-container">
                <button className="option-button" onClick={() => setIsPosting(true)}>Post Your Requirement</button>
                <button className="option-button" onClick={() => setIsPosting(false)}>Check Labour</button>
            </div>

			{isPosting ? (
				<form className="requirement-form container my-5 p-4 border rounded shadow-sm"  onSubmit={handleSubmit}>
					<h2 className="text-center text-balck mb-4">Post Your Requirement</h2>

				<h4 className="text-secondary mb-3">Personal Details</h4>
				<div className="mb-3">
					<label className="form-label">Name:</label>
					<input type="text" className="form-control" name="name" value={formData.name} onChange={handleUserDetailsChange} required />
				</div>

				<div className="mb-3">
					<label className="form-label">Mobile Number:</label>
					<input
						type="text"
						className="form-control"
						name="mobilenumber"
						value={formData.mobilenumber}
						onChange={handleUserDetailsChange}
						onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
						pattern="^\d{10}$"
						maxLength="10"
						title="Please enter a valid 10-digit mobile number"
						required
						/>
				</div>
				<div className="mb-3">
					<label className="form-label">Alternative Mobile Number:</label>
					<input type="text" className="form-control" name="alternative_mobile_number" value={formData.alternative_mobile_number} onChange={handleUserDetailsChange}   onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
						pattern="^\d{10}$" maxLength="10" title="Please enter a valid 10-digit mobile number" required />
				</div>

				<div className="mb-3">
					<label className="form-label">Email:</label>
					<input type="text" className="form-control" name="email" value={formData.email} onChange={handleUserDetailsChange}     pattern="^[^@]+@[^@]+$" title="Email must contain exactly one '@' symbol" required />
				</div>

				<div className="mb-3">
					<label className="form-label">Address:</label>
					<input type="text" className="form-control" name="address" value={formData.address} onChange={handleUserDetailsChange} required />
				</div>

				<div className="mb-3">
					<label className="form-label">Pincode:</label>
					<input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleUserDetailsChange} pattern="\d{6}" title="Enter a valid 6-digit pincode" required />
				</div>

				<h4 className="text-secondary mt-4 mb-3">Service Requirements</h4>

				<div className="mb-3">
					<label className="form-label">City:</label>
					<select className="form-select" name="city" value={formData.city} onChange={handleFormChange} required>
						<option value="">Select City</option>
						<option value="mysore">Mysore</option>
						<option value="bangalore">Bangalore</option>
						<option value="chennai">Chennai</option>
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label">Area:</label>
					<select className="form-select" name="area" value={formData.area} onChange={handleFormChange} required>
						<option value="">Select Area</option>
						{formData.city && areaOptions[formData.city.toLowerCase()].map((area) => (
							<option key={area} value={area}>{area}</option>
						))}
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label">Preferences Language:</label>
					<input type="text" className="form-control" name="language" placeholder="Hindi, English, Kannada etc" value={formData.language} onChange={handleFormChange} required />
				</div>
				
				<div className="mb-3">
					<label className="form-label">Child Age:</label>
					<input type="number" className="form-control" name="age" value={formData.age} onChange={handleUserDetailsChange} min="0"  required />
				</div>

				<div className="mb-3">
					<label className="form-label">Child Gender:</label>
					<select className="form-select" name="gender" value={formData.gender} onChange={handleFormChange} required>
						<option value="">Select</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Others">Others</option>
					</select>
				</div>

				
				<div className="mb-3">
					<label className="form-label">Preferred Priority:</label>
					<select className="form-select" name="urgencyStatus" value={formData.urgencyStatus} onChange={handleFormChange} required>
						<option value="">Select</option>
						<option value="immediate">Immediate</option>
						<option value="within_1_week">Within 1 Week</option>
						<option value="just_enquiry">Just Enquiry</option>
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label">Preferred Care Time:</label>
					<select className="form-select" name="preferredCareTime" value={formData.preferredCareTime} onChange={handleFormChange} required>
						<option value="">Select</option>
						<option value="morning_shift">Morning - 6am to 10am</option>
						<option value="evening_shift">Evening - 5pm to 9pm</option>
						<option value="partial_shift">Partial 12hrs</option>
						<option value="full_shift">Full Time 24hrs</option>
					</select>
				</div>

				<div className="mb-3">
					<label className="form-label">Preferred Duration:</label>
					<input
						type="text" className="form-control" name="requiredDuration" placeholder="In Months"
						value={formData.duration} onChange={handleFormChange} required />
				</div>

				<div className="mb-3">
					<label className="form-label">Preferred Gender:</label>
					<select className="form-select" name="preferredgender" value={formData.preferredgender} onChange={handleFormChange} required>
						<option value="">Select</option>
						<option value="female">Female</option>
						<option value="male">Male</option>
						<option value="any">Any</option>
					</select>
				</div>

				<h4 className="text-secondary mt-4 mb-3">Baby Care Tasks</h4>
				<div className="checkbox-container mb-3">
					<div>
						{[
							"Changing Diapers and cloth's",
							"Cleaning Utensils of Baby",
							"Preparing and Feeding Baby Food/Milk",
							"Preparing baby for sleep",
							"Taking Baby for walk",
							"Bathing and Dressing the Baby",
							"Monitoring Baby’s Health and Hygiene",
						].map((task, index) => (
							<div className="form-check d-flex align-items-start mb-2" key={index}>
								<input
									className="form-check-input  me-3 mt-0"
									type="checkbox"
									value={task}
									checked={formData.baby_care_tasks.includes(task)}
									onChange={handleCheckboxChange}
									style={{ minWidth: "18px", minHeight: "18px" }}
								/>
								<label className="form-check-label">{task}</label>
							</div>

						))}
					</div>
				</div>

				<div className="mb-3">
					<label className="form-label">Additional Notes:</label>
					<textarea className="form-control" name="additionalNotes" placeholder="Enter any specific requirements..."
						value={formData.additionalNotes} onChange={handleFormChange} />
				</div>

				<div className="mb-3">
					<label className="form-label">Salary Offer:</label>
					<input
						type="text" className="form-control" name="salaryOffered" placeholder="Per Month Ex. 1000rs/month" 
						value={formData.salaryOffered} onChange={handleFormChange} title="Enter a valid salary e.g. 10000 rs/month" required />
				</div>

				
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
						I agree to the <a href="http://www.digilaboursolutions.com.s3-website.ap-south-1.amazonaws.com/terms-conditions.html" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
					</label>
				</div>


				<button type="submit" className="btn btn-primary w-100 mt-4">Submit</button>
					
					{popupView === "formData" && (
						<div className="popup-overlay">
							<div className="popup-box">
								<h3>Enter Your Details</h3>
								<h4>Personal Details</h4>
								<label>	Name:
									<input type="text" name="username" value={formData.username} onChange={handleUserDetailsChange} pattern="^\d{10}$" title="Please enter a valid 10-digit mobile number" required />
								</label>
								<label> Mobile Number:
									<input type="text" name="mobile" value={formData.mobile} onChange={handleUserDetailsChange}  pattern="^\d{10}$" title="Please enter a valid 10-digit mobile number" required />
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
								<p>Work Category: {formData.work_category || "babycaretaker"}</p>
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
						<select name="city" value={searchCriteria.city} onChange={handleFormChangeCheckLabour} required >
							<option value="">Select City</option>
							<option value="mysore">Mysore</option>
							<option value="bangalore">Bangalore</option>
							<option value="chennai">Chennai</option>
						</select>
					</label>
					<label> Area:
						<select name="area" value={searchCriteria.area} onChange={handleFormChangeCheckLabour} required >
							<option value="">Select Area</option>
							{searchCriteria.city &&
								areaOptions[searchCriteria.city.toLowerCase()].map((area) => (
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

export default BabyCaretaker;



