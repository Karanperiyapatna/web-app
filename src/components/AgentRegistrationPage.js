import '../styles/workRegistrationPage.css';
import React, { useState } from 'react';
import "../styles/ContactUs.css";
import { useNavigate } from "react-router-dom";

function WorkerRegistrationPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		mobile_number: "",
		alternative_mobile: "",
		email: "",
		age: "",
		gender: "",
		area: "",
		city: "",
		pincode: "",
		password: "",
	});

	const [showLogin, setShowLogin] = useState(false); // State to control login popup
	const [loginData, setLoginData] = useState({ email: "", password: "" });

	const areaOptions = {
		mysore: ["JP Nagar", "Kuvempunagar"],
		bangalore: ["Banashankari", "Vijayanagar"],
		chennai: ["Aramadai"]
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
			...(name === "city" ? { area: "" } : {}) // Reset area when city changes
		}));
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		const form = new FormData();
		Object.entries(formData).forEach(([key, value]) => form.append(key, value));
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/api/agent/agent-signup/`, {
				method: "POST",
				body: form,
			});

			const data = await response.json();

			if (response.ok) {
				console.log("Search Results:", data);
				navigate("/", { state: { labours: data.labours } });
				alert(data.message);
			} else {
				console.error("Error:", data.error || "Something went wrong");
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	const handleLoginChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/api/agent/agent-login/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(loginData),
			});
			const data = await response.json();

			if (response.ok) {
				alert("Login Successful");
				setShowLogin(false);
			} else {
				alert("Login Failed: " + (data.error || "Invalid credentials"));
			}
		} catch (error) {
			console.error("Login Error:", error);
		}
	};

	return (
		<div className="container">
			<div className="login-link">
				<p>Already have an account? <span className="clickable" onClick={() => setShowLogin(true)}>Login</span></p>
			</div>

			{showLogin && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>Agent Login</h2>
						<form onSubmit={handleLoginSubmit}>
							<input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Email" required />
							<input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Password" required />
							<button type="submit">Login</button>
						</form>
						<button className="close-btn" onClick={() => setShowLogin(false)}>Close</button>
					</div>
				</div>
			)}

			<form onSubmit={handleRegister} className="form">
				<h2>Agent Registration Form</h2>
				<input type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Full Name" required />
				<input type="tel" name="mobile_number" value={formData.mobile_number} onChange={handleFormChange} placeholder="Mobile Number" required />
				<input type="tel" name="alternative_mobile" value={formData.alternative_mobile} onChange={handleFormChange} placeholder="Alternative Mobile Number" required />
				<input type="mail" name="email" value={formData.email} onChange={handleFormChange} placeholder="Mail ID" required />
				<input type="text" name="address" value={formData.address} onChange={handleFormChange} placeholder="Address" required />
				<select name="gender" value={formData.gender} onChange={handleFormChange} required>
					<option value="">Select Gender</option>
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Other">Other</option>
				</select>

				<label>City:
					<select name="city" value={formData.city} onChange={handleFormChange} required>
						<option value="">Select City</option>
						<option value="mysore">Mysore</option>
						<option value="bangalore">Bangalore</option>
						<option value="chennai">Chennai</option>
					</select>
				</label>
				<label>Working Area:
					<select name="area" value={formData.area} onChange={handleFormChange} required>
						<option value="">Select Area</option>
						{formData.city && areaOptions[formData.city]?.map((area) => (
							<option key={area} value={area}>{area}</option>
						))}
					</select>
				</label>
				<input type="number" name="pincode" value={formData.pincode} onChange={handleFormChange} placeholder="Pincode" required />
				<input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Agent Password" required />
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default WorkerRegistrationPage;
