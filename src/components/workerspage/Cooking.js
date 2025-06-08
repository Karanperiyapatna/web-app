
import React, { useState } from "react";
import axios from "axios";
import "../../styles/cooking.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const Cooking = () => {
	

	const [isPosting, setIsPosting] = useState(false);

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

		urgency: "",
		preferredCookTime : "",
		duration : "",
	
		FoodType: [],
		MealsType : [],
		CuisineType : [],
		DietaryRestrictions : [],

		additionalNotes :"",
		salaryOffered : "",

	});


	
	const [searchCriteria, setSearchCriteria] = useState({
		gender: "",
		city: "", // For city
		area: "" // For area
	});

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
		   ...prevData,
		   [name]: value,
		}));

		// Added this part of code - issue with the city undefined
		if (name === "city") {
			setSearchCriteria((prev) => ({
				...prev,
				city: value,
			}));
		}
	};
	 

	const handleCheckboxChange = (category) => (e) => {
		const { value, checked } = e.target;
		setFormData((prevData) => {
			const updatedValues = checked
				? [...prevData[category], value]
				: prevData[category].filter((item) => item !== value);
			
			return { ...prevData, [category]: updatedValues };
		});
	};
	
	const handleFormChangeCheckLabour = (e) => {
		setSearchCriteria({
			...searchCriteria,
			[e.target.name]: e.target.value,
		});
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
	
		console.log("Gender:", searchCriteria.gender, "City:", searchCriteria.city, "Area:", searchCriteria.area);
		if (!searchCriteria.gender || !searchCriteria.city || !searchCriteria.area) {
			alert("Please fill all fields before searching");
			return;
		}
	
		try {
			const requestBody = {
				...searchCriteria,
				work_category: "cooking" // Add work_category field with default value
			};
			console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);
	
			const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/search/labour-babycaretaker/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody),
			});
			const responseText = await response.text();
			console.log("Raw Response:", responseText);
	
			let data;
			try {
				data = JSON.parse(responseText);
			} catch (jsonError) {
				console.error("Failed to parse JSON. Possibly an HTML error page was returned.", jsonError);
				return;
			}
	
			if (response.ok) {
				console.log("Search Results:", data);
				navigate("/labour-list", { state: { labours: data.labours, work_category: "Cooking" } });
			} else {
				console.error("Error:", data.error);
			}
		} catch (error) {
			console.error("Request failed:", error);
		}
	};
	
  
	// Create a FormData object to handle file uploads
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
	
		// Append form fields to FormData
		Object.keys(formData).forEach((key) => {
			data.append(key, formData[key]);
		});
	
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/api/requirements/cooking/`,
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
			<h2>Cooking Labour Requirement Form</h2>
            <div className="options-container">
                <button className="option-button" onClick={() => setIsPosting(true)}>Post Your Requirement</button>
                <button className="option-button" onClick={() => setIsPosting(false)}>Check Labour</button>
            </div>

			{isPosting ? (
				<form className="requirement-form container my-5 p-4 border rounded shadow-sm" onSubmit={handleSubmit} style={{ fontSize: "16px" }}>
					<h2 className="text-center text-primary mb-4">Post Your Requirement</h2>
					<h4 className="text-secondary">Personal Details</h4>
					<div className="mb-3">
						<label className="form-label">Name:
							<input type="text" className="form-control" name="username" value={formData.username} onChange={handleUserDetailsChange} required />
						</label>
						<label className="form-label">Mobile Number:
							<input type="number" className="form-control" name="mobilenumber" value={formData.mobilenumber} onChange={handleUserDetailsChange} required />
						</label>
						<label className="form-label">Email:
							<input type="text" className="form-control" name="email" value={formData.email} onChange={handleUserDetailsChange} required />
						</label>
						<label className="form-label">Address:
							<input type="text" className="form-control" name="address" value={formData.address} onChange={handleUserDetailsChange} required />
						</label>
						<label className="form-label"> City:
							<select name="city" className="form-select" value={formData.city} onChange={handleFormChange} required>
								<option value="">Select City</option>
								<option value="mysore">Mysore</option>
								<option value="bangalore">Bangalore</option>
								<option value="chennai">Chennai</option>
							</select>
						</label>
						<label className="form-label"> Area:
							<select name="area"  className="form-select" value={formData.area} onChange={handleFormChange} required>
								<option value="">Select Area</option>
								{formData.city && areaOptions[formData.city.toLowerCase()].map((area) => (
									<option key={area} value={area}>{area}</option>
								))}
							</select>
						</label>
						<label  className="form-label">Preferences Language:
								<input type="text"  className="form-control" name="language" placeholder="Hindi, English, Kannada etc" value={formData.language} onChange={handleFormChange} required />
						</label>

						<h5  className="text-secondary mt-4">Chef Details</h5>
						<div className="mb-3">
							<label>Gender:
									<select name="gender" className="form-select"  value={formData.gender} onChange={handleFormChange} required>
										<option value="">Select</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Others">Others</option>
									</select>
							</label>
						</div>
					</div>

					<h4 className="text-secondary">Prefered Food Type</h4>
					<div className="mb-3">
						{[ "Veg", "Non-Veg" ].map((type, index) => (
						<div key={index} className="d-flex justify-content-between align-items-center mb-2">
							<label className="form-check-label mb-0">{type}</label>
							<input type="checkbox" 
							className="form-check-input" 
							style={{ width: "20px", height: "20px", marginLeft: "10px" }} 
							value={type} checked={formData.FoodType.includes(type)} onChange={handleCheckboxChange("FoodType")} />
						</div>
						))}
					</div>

					<h4 className="text-secondary">MealsType</h4>
					<div className="mb-3">
						{[ "Breakfast", "Lunch", "Dinner" ].map((type, index) => (
						<div key={index} className="d-flex justify-content-between align-items-center mb-2">
							<label className="form-check-label mb-0">{type}</label>
							<input type="checkbox" 
							className="form-check-input" 
							style={{ width: "20px", height: "20px", marginLeft: "10px" }} 
							value={type} checked={formData.MealsType.includes(type)} onChange={handleCheckboxChange("MealsType")} />
						</div>
						))}
					</div>

					<h4 className="text-secondary">Cuisine Type</h4>
					<div className="mb-3">
						{[ "North Indian", "South Indian", "Chinese", "Italian" ].map((type, index) => (
						<div key={index} className="d-flex justify-content-between align-items-center mb-2">
							<label className="form-check-label mb-0">{type}</label>
							<input type="checkbox" 
								className="form-check-input" 
								style={{ width: "20px", height: "20px", marginLeft: "10px" }} 
								value={type} checked={formData.CuisineType.includes(type)} onChange={handleCheckboxChange("CuisineType")} />
					
						</div>
						))}
					</div>

					<h4 className="text-secondary">Dietary Restrictions</h4>
					<div className="mb-3">
						{[ "Jain", "Gluten-Free", "Diabetic-Friendly", "Vegan", "Low-Salt", "High-Protein" ].map((type, index) => (
							<div key={index} className="d-flex justify-content-between align-items-center mb-2">
								<label className="form-check-label mb-0">{type}</label>
								<input 
									type="checkbox" 
									className="form-check-input" 
									style={{ width: "20px", height: "20px", marginLeft: "10px" }} 
									value={type} 
									checked={formData.DietaryRestrictions.includes(type)} 
									onChange={handleCheckboxChange("DietaryRestrictions")} 
								/>
							</div>
						))}
					</div>
					<h4 className="text-secondary">Preferred Timings</h4>
					<div className="mb-3">
						{[ "Full-Time", "Part-Time" ].map((type, index) => (
						<div key={index} className="d-flex justify-content-between align-items-center mb-2">
							<label className="form-check-label mb-0">{type}</label>
							<input type="checkbox" 
							className="form-check-input" 
							style={{ width: "20px", height: "20px", marginLeft: "10px" }}
							value={type} checked={formData.preferredCookTime.includes(type)} onChange={handleCheckboxChange("preferredCookTime")} />
						</div>
						))}
					</div>
					<h4 className="text-secondary">Urgency:</h4>
					<label className="mb-3">
						<select name="urgencyStatus" className="form-select" value={formData.urgencyStatus} onChange={handleFormChange} required>
							<option value="">Select</option>
							<option value="immediate">Immediate</option>
							<option value="within_1_week">Within 1 Week</option>
							<option value="just_enquiry">Just Enquiry</option>
						</select>
					</label>

					<label  className="form-label">	Duration:
								<input type="text" className="form-control" name="duration" placeholder="In Months" value={formData.duration} onChange={handleFormChange} required />
					</label>

					<label  className="form-label"> Additional Notes:
							<textarea name="additionalNotes"  className="form-control" placeholder="Enter any specific requirements..."
								value={formData.additionalNotes}
								onChange={handleFormChange}
							/>
					</label>
					<label  className="form-label"> Salary Offer:
						<input
							type="text" name="salaryOffered" className="form-control" placeholder="Per Month Ex. 1000rs/month" value={formData.salaryOffered} onChange={handleFormChange} required />
					</label>
	
					<button type="submit" className="btn btn-primary w-100 mt-4">
						Submit
					</button>
					{popupView === "userDetails" && (
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
					<form className="requirement-form container my-5 p-4 border rounded shadow-sm" onSubmit={handleSearchCheckLabour}>
						<h2 className="text-center text-primary mb-4">Check Labour</h2>

						<div className="mb-3">
							<label className="form-label">Gender:</label>
							<select name="gender" className="form-select" value={searchCriteria.gender} onChange={handleFormChangeCheckLabour} required>
								<option value="">Select</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>

						<div className="mb-3">
							<label className="form-label">City:</label>
							<select name="city" className="form-select" value={searchCriteria.city} onChange={handleFormChangeCheckLabour} required>
								<option value="">Select City</option>
								<option value="mysore">Mysore</option>
								<option value="bangalore">Bangalore</option>
								<option value="chennai">Chennai</option>
							</select>
						</div>

						<div className="mb-3">
							<label className="form-label">Area:</label>
							<select name="area" className="form-select" value={searchCriteria.area} onChange={handleFormChangeCheckLabour} required>
								<option value="">Select Area</option>
								{searchCriteria.city &&
									areaOptions[searchCriteria.city.toLowerCase()].map((area) => (
										<option key={area} value={area}>
											{area}
										</option>
								))}
							</select>
						</div>

						<button type="submit" className="btn btn-primary w-100 mt-3">Search</button>
					</form>

			</div>
		)}
	</div>
	)
};
export default Cooking;



					{/* <h4>SpecialRequirements</h4>
						<div className = "checkbox-container">
							<div>
							{[ "Baby Food", "Elderly-Friendly", "Postpartum Diet", "Ayurvedic Meals", ].map((task, index) => (
							<label key={index}>
								<input type="checkbox" value={task} checked={formData.SpecialRequirements.includes(task)} onChange={handleCheckboxChange("SpecialRequirements")} />
								{task}
							</label>
							))}
						</div>				
					</div> */}



					{/* <h4>KitchenCleaning</h4>
						<div className = "checkbox-container">
							<div>
							{[ "Yes", "No", ].map((task, index) => (
							<label key={index}>
								<input type="checkbox" value={task} checked={formData.KitchenCleaning.includes(task)} onChange={handleCheckboxChange("KitchenCleaning")} />
								{task}
							</label>
							))}
						</div>				
					</div>
					
					<h4>GroceryHandling</h4>
						<div className = "checkbox-container">
							<div>
							{[ "Cook Brings Own Ingredients", "Uses Provided Groceries", 	].map((task, index) => (
							<label key={index}>
								<input type="checkbox" value={task} checked={formData.GroceryHandling.includes(task)} onChange={handleCheckboxChange("GroceryHandling")} />
								{task}
							</label>
							))}
						</div>				
					</div> */}
					
					{/* <h4>AdditionalServices</h4>
						<div className = "checkbox-container">
							<div>
							{[ 	"Tiffin Preparation", "Meal Prepping for Storage", "Cooking for Guests" ].map((task, index) => (
							<label key={index}>
								<input type="checkbox" value={task} checked={formData.AdditionalServices.includes(task)} onChange={handleCheckboxChange("AdditionalServices")} />
								{task}
							</label>
							))}
						</div>				
					</div> */}

					{/* <h4>Cooking Style</h4>
					<div className = "checkbox-container">
							<div>
							{[ "Home-Cooked", "Restaurant-Style", " Festive Special", "Healthy Diet", ].map((task, index) => (
							<label key={index}>
								<input type="checkbox" value={task} checked={formData.CookingStyle.includes(task)} onChange={handleCheckboxChange("CookingStyle")} />
								{task}
							</label>
							))}
						</div>				
					</div> */}
