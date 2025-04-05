import React, { useState } from "react";
import axios from "axios";
import "../../styles/EmpBabyCaretaker.css";
import { useNavigate } from "react-router-dom";

const EmpCooking = () => {

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
		handling : [],
		foodType : [],
		mealType : [],
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
				'http://127.0.0.1:8000/api/employees/labour-cooking/',
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

	
	const handleCheckboxChange = (category) => (e) => {
		const { value, checked } = e.target;
		setFormData((prevData) => {
			const updatedValues = checked
				? [...(prevData[category] || []), value]  // Fallback to empty array
				: (prevData[category] || []).filter((item) => item !== value);
			
			return { ...prevData, [category]: updatedValues };
		});
	};

	return (

		<form className="requirement-form" onSubmit={handleSubmit}>
			<h2>Cooking Labour Registration Form</h2>
			<h4>Personal Details</h4>
			<label> Name:
				<input type="text" name="name" value={userDetails.name} onChange={handleUserDetailsChange} required />
			</label>

			<label> Age:
				<input
					type="number" name="age" value={userDetails.age} onChange={handleUserDetailsChange} required />
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
			<label> Username:
				<input type="username" name="username" value={formData.username} onChange={handleFormChange}  required />			
			</label>

			<label> Password:
				<input type="password" name="password" value={formData.password} onChange={handleFormChange} required />
			</label>

			<label> Gender:
				<select name="gender" value={formData.gender} onChange={handleFormChange} required>
					<option value="">Select</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Others">Others</option>
				</select>
			</label>

			<h4>Handling</h4>
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
							checked={(formData.handling || []).includes(task)}
							onChange={handleCheckboxChange("handling")}
							/>
							{task}
						</label>
						))}
				</div>
			</div>

			<h4>Food Type</h4>
					<div className = "checkbox-container">
						<div>
						{[
						"Veg",
						"Non Veg", 

						].map((task, index) => (
						<label key={index}>
							<input
							type="checkbox"
							value={task}
							checked={(formData.foodType || []).includes(task)}
							onChange={handleCheckboxChange("foodType")}
							/>
							{task}
						</label>
						))}
				</div>
			</div>

			<h4>Meal Type</h4>
					<div className = "checkbox-container">
						<div>
						{[
						"Breakfast",
						"Lunch",
						"Dinner", 

						].map((task, index) => (
						<label key={index}>
							<input
							type="checkbox"
							value={task}
							checked={(formData.mealType || []).includes(task)}
							onChange={handleCheckboxChange("mealType")}
							/>
							{task}
						</label>
						))}
				</div>
			</div>


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
			<label> Availability:
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

			<label> Hourly Rate (₹):
				<input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleFormChange} placeholder="e.g., 150" required />
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

export default EmpCooking;






// import React, { useState } from "react";
// import axios from "axios";
// import "../../styles/EmpBabyCaretaker.css";
// import { useNavigate } from "react-router-dom";


// const EmpCooking = () => {

// 	const navigate = useNavigate();
	
// 	const areaOptions = {
// 			mysore: ["JP Nagar", "Kuvempunagar"],
// 			bangalore: ["Banashankari", "Vijayanagar"],
// 			chennai: ["Aramadai"]
// 	};

// 	const [userDetails, setUserDetails] = useState({
// 		name: "",
// 		age: "",
// 		mobilenumber: "",
// 		email: "",
// 		username: "",
// 		password :"",
// 		address: "",
// 		photo: null,
// 		identityCard: null,
// 	});

// 	const [formData, setFormData] = useState({
// 		urgency: "",
// 		gender: "",
// 		workingHours: "",
// 		specificRequirement: "",
// 		FoodType: [],
// 		MealsType : [],
// 		CuisineType : [],
// 		DietaryRestrictions : [],
// 		CookingStyle : [],
// 		SpecialRequirements : [],
// 		ServiceType : [],
// 		KitchenCleaning : [],
// 		GroceryHandling : [],
// 		AdditionalServices : [],
// 		careLocation: "",
// 		area: "",
// 		salaryOffer: "",
// 		specificPreferencesLanguage: "",
// 		specificRequirements: "",
// 	});


// 	const handleCheckboxChange = (category) => (e) => {
// 		const { value, checked } = e.target;
// 		setFormData((prevData) => {
// 			const updatedValues = checked
// 				? [...prevData[category], value]
// 				: prevData[category].filter((item) => item !== value);
			
// 			return { ...prevData, [category]: updatedValues };
// 		});
// 	};
	

// 	const handleUserDetailsChange = (e) => {
// 		const { name, value } = e.target;
// 		setUserDetails({ ...userDetails, [name]: value });
// 	};
	
  
// 	// Create a FormData object to handle file uploads
// 	let data = new FormData();

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();

// 		// Combine user details and form data into one payload
// 		const completeData = { ...formData, ...userDetails };

// 		// Create a new FormData instance to clear the previous data
// 		data = new FormData();  
// 		for (const key in completeData) {
// 			data.append(key, completeData[key]);
// 		}

// 		try {
// 			const response = await axios.post(
// 				'http://127.0.0.1:8000/api/EmpCooking/',
// 				data,
// 				{
// 					headers: {
// 						'Content-Type': 'multipart/form-data'
// 					},
// 				}
// 			);

// 			// Check if the request was successful
// 			if (response.status === 200 || response.status === 201) {
// 				console.log("Search Results:", response.data);
// 				navigate("/", { state: { labours: response.data.labours } });
// 				alert('Form submitted successfully! ' + response.data.message);
// 			} else {
// 				console.error("Error:", response.data.error);
// 			}
// 		} catch (error) {
// 			console.error('Error submitting form:', error);
// 			alert('There was an error submitting your request.');
// 		}
// 	};


// 	const handleFormChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prevData) => ({
// 		   ...prevData,
// 		   [name]: value,
// 		}));
// 	 };
	 
// 	return (
// 		<div className="baby-caretaker-container">
// 			<h2>Cooking Labour Requirement Form</h2>
// 				<form className="requirement-form" onSubmit={handleSubmit}>
// 					<h2>Post Your Requirement</h2>
// 					<h4>Personal Details</h4>
// 					<div>
// 						<label> Name:
// 							<input type="text" 	name="username" value={userDetails.username} onChange={handleUserDetailsChange} required />
// 						</label>
// 						<label> Age:
// 							<input  type="number" name="age" value={userDetails.age} onChange={handleUserDetailsChange} required />
// 						</label>
// 						<label> Mobile Number:
// 							<input type="number" name="mobilenumber" value={userDetails.mobilenumber} onChange={handleUserDetailsChange} required />
// 						</label>
// 						<label> Email: 
// 							<input type="text" name="email" value={userDetails.email} onChange={handleUserDetailsChange} required />
// 						</label>
// 						<label> Address:
// 						 <input type="text" name="address" value={userDetails.address} onChange={handleUserDetailsChange} required />
// 						</label>
// 						<label>Gender:
// 								<select name="gender" value={formData.gender} onChange={handleFormChange} required>
// 									<option value="">Select</option>
// 									<option value="Male">Male</option>
// 									<option value="Female">Female</option>
// 									<option value="Others">Others</option>
// 								</select>
// 						</label>

// 					</div>

// 						<h4>FoodType</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "Veg", "Non-Veg", ].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.FoodType.includes(task)} onChange={handleCheckboxChange("FoodType")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>

// 					<h4>MealsType</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "Breakfast", "Lunch", "Dinner", ].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.MealsType.includes(task)} onChange={handleCheckboxChange("MealsType")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>

// 					<h4>CuisineType</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "North Indian", "South Indian", "Chinese", "Italian", ].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.CuisineType.includes(task)} onChange={handleCheckboxChange("CuisineType")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>
// 					<h4>DietaryRestrictions</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "Jain", "Gluten-Free", "Diabetic-Friendly", "Vegan", "Low-Salt", "High-Protein" 	].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.DietaryRestrictions.includes(task)} onChange={handleCheckboxChange("DietaryRestrictions")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>

// 					<h4>CookingStyle</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "Home-Cooked", "Restaurant-Style", " Festive Special", "Healthy Diet", ].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.CookingStyle.includes(task)} onChange={handleCheckboxChange("CookingStyle")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>

// 					<h4>SpecialRequirements</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "Baby Food", "Elderly-Friendly", "Postpartum Diet", "Ayurvedic Meals", ].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.SpecialRequirements.includes(task)} onChange={handleCheckboxChange("SpecialRequirements")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>

// 					<h4>ServiceType</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "Full-Time", "Part-Time", ].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.ServiceType.includes(task)} onChange={handleCheckboxChange("ServiceType")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>

// 					<h4>KitchenCleaning</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "Yes", "No", ].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.KitchenCleaning.includes(task)} onChange={handleCheckboxChange("KitchenCleaning")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>
					
// 					<h4>GroceryHandling</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ "Cook Brings Own Ingredients", "Uses Provided Groceries", 	].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.GroceryHandling.includes(task)} onChange={handleCheckboxChange("GroceryHandling")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>
					
// 					<h4>AdditionalServices</h4>
// 						<div className = "checkbox-container">
// 							<div>
// 							{[ 	"Tiffin Preparation", "Meal Prepping for Storage", "Cooking for Guests" ].map((task, index) => (
// 							<label key={index}>
// 								<input type="checkbox" value={task} checked={formData.AdditionalServices.includes(task)} onChange={handleCheckboxChange("AdditionalServices")} />
// 								{task}
// 							</label>
// 							))}
// 						</div>				
// 					</div>


// 					<h4>Service Requirements</h4>
// 					<div>
// 						<label> Urgency:
// 							<select name="urgency" value={formData.urgency} onChange={handleFormChange} required>
// 								<option value="">Select</option>
// 								<option value="Urgent">Urgent</option>
// 								<option value="Within 1 Week">Within 1 Week</option>
// 								<option value="Just Enquiry">Just Enquiry</option>
// 							</select>
// 						</label>
// 						<label>
// 						Preferred Care Time:
// 						<select name="preferredCareTime" value={formData.preferredCareTime} onChange={handleFormChange} required>
// 							<option value="">Select</option>
// 							<option value="Full Time 24hrs">Full Time 24hrs</option>
// 							<option value="Partial 12hrs">Partial 12hrs</option>
// 							<option value="Morning - 6am to 10am">Morning - 6am to 10am</option>
// 							<option value="Evening - 5pm 9pm">Evening - 5pm 9pm</option>
// 						</select>
// 						</label>
// 						<label>	Duration:
// 								<input type="text" name="duration" placeholder="In Months" value={formData.duration} onChange={handleFormChange} required />
// 						</label>
// 						<label> City:
// 							<select name="careLocation" value={formData.careLocation} onChange={handleFormChange} required>
// 								<option value="">Select City</option>
// 								<option value="mysore">Mysore</option>
// 								<option value="bangalore">Bangalore</option>
// 								<option value="chennai">Chennai</option>
// 							</select>
// 						</label>
// 						<label> Area:
// 							<select name="area" value={formData.area} onChange={handleFormChange} required>
// 								<option value="">Select Area</option>
// 								{formData.careLocation && areaOptions[formData.careLocation.toLowerCase()].map((area) => (
// 									<option key={area} value={area}>{area}</option>
// 								))}
// 							</select>
// 						</label>
// 						<label>Preferences Language:
// 								<input type="text" name="specificPreferencesLanguage" placeholder="Hindi, English, Kannada etc" value={formData.specificPreferencesLanguage} onChange={handleFormChange} required />
// 						</label>
// 						<label> Specific Requirements:
// 							<textarea name="specificRequirements" placeholder="Enter any specific requirements..."
// 								value={formData.specificRequirements}
// 								onChange={handleFormChange}
// 							/>
// 						</label>
// 						<label> Salary Offer:
// 							<input
// 								type="text" name="salaryOffer" placeholder="Salary Offer" value={formData.salaryOffer} onChange={handleFormChange} required />
// 						</label>

// 					</div>
// 					<button type="submit" className="submit-button">
// 						Submit
// 					</button>
					
// 				</form>
// 	</div>
// 	)
// };
// export default EmpCooking;
