import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSignup() {
	const [formData, setFormData] = useState({
		name: '',
		mobile_number: '',
		alt_mobile_number: '',
		email: '',
		address: '',
		city: '',
		area: '',
		state: '',
		pincode: '',
		username :'',
		password: '',
		agreeTerms : '',
	});
	const [agreeTerms, setAgreeTerms] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	// Area options based on city
	const areaOptions = {
		mysore: ['JP Nagar', 'Vijayanagar', 'Gokulam'],
		bangalore: ['Whitefield', 'Indiranagar', 'Jayanagar'],
		chennai: ['Anna Nagar', 'T. Nagar', 'Velachery'],
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
	
		// Handle checkbox separately
		if (type === 'checkbox') {
			setAgreeTerms(checked);
			setFormData({ ...formData, [name]: checked }); // Update formData for agreeTerms
		} else {
			setFormData({ ...formData, [name]: value });
		}
	
		// Clear error on change
		if (errors[name]) {
			setErrors({ ...errors, [name]: '' });
		}
	};
	

	const validateForm = () => {
		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = 'Name is required';
		if (!/^\d{10}$/.test(formData.mobile_number)) newErrors.mobile_number = 'Enter valid 10-digit number';
		if (!/^\d{10}$/.test(formData.alt_mobile_number)) newErrors.alt_mobile_number = 'Enter valid 10-digit number';
		if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
		if (!formData.address.trim()) newErrors.address = 'Address is required';
		if (!formData.city) newErrors.city = 'City is required';
		if (!formData.area) newErrors.area = 'Area is required';
		if (!formData.state.trim()) newErrors.state = 'State is required';
		if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
		if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
		if (!agreeTerms) newErrors.terms = 'You must agree to Terms & Conditions';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;
	
		// Convert boolean to string
		const updatedFormData = {
			...formData,
			agreeTerms: agreeTerms ? 'true' : 'false',
		};
	
		const payload = new FormData();
		Object.entries(updatedFormData).forEach(([key, value]) => {
			payload.append(key, value);
		});
	
		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/api/user/user-signup/`,
				{
					method: 'POST',
					body: payload,
				}
			);
			const data = await res.json();
			if (res.ok) {
				alert('Signup Successful');
				navigate('/UserDashboard', {
					state: { name: formData.name, userId: data.user_id },
				});
			} else {
				alert('Signup Failed: ' + data.message);
			}
		} catch (err) {
			console.error('Error:', err);
		}
	};
	

	return (
		<form className="requirement-form" onSubmit={handleSubmit}>
			<h2>User Signup</h2>
			<h4>Personal Details</h4>

			<label>Name:
				<input type="text" name="name" value={formData.name} onChange={handleChange} />
				{errors.name && <span className="error">{errors.name}</span>}
			</label>

			<label>Mobile Number:
				<input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} />
				{errors.mobile_number && <span className="error">{errors.mobile_number}</span>}
			</label>

			<label>Alternative Mobile Number:
				<input type="text" name="alt_mobile_number" value={formData.alt_mobile_number} onChange={handleChange} />
				{errors.alt_mobile_number && <span className="error">{errors.alt_mobile_number}</span>}
			</label>

			<label>Email:
				<input type="email" name="email" value={formData.email} onChange={handleChange} />
				{errors.email && <span className="error">{errors.email}</span>}
			</label>

			<label>Address:
				<input type="text" name="address" value={formData.address} onChange={handleChange} />
				{errors.address && <span className="error">{errors.address}</span>}
			</label>

			<label>City:
				<select name="city" value={formData.city} onChange={(e) => {
					const selectedCity = e.target.value;
					setFormData((prevData) => ({
						...prevData,
						city: selectedCity,
						area: '', // reset area when city changes
					}));
					if (errors.city || errors.area) {
						setErrors((prevErrors) => ({
							...prevErrors,
							city: '',
							area: '',
						}));
					}
				}}>
					<option value="">Select City</option>
					<option value="mysore">Mysore</option>
					<option value="bangalore">Bangalore</option>
					<option value="chennai">Chennai</option>
				</select>
				{errors.city && <span className="error">{errors.city}</span>}
			</label>

			<label>Area:
				<select name="area" value={formData.area} onChange={handleChange} disabled={!formData.city}>
					<option value="">Select Area</option>
					{formData.city &&
						areaOptions[formData.city]?.map((area) => (
							<option key={area} value={area}>{area}</option>
						))
					}
				</select>
				{errors.area && <span className="error">{errors.area}</span>}
			</label>

			<label>State:
				<input type="text" name="state" value={formData.state} onChange={handleChange} />
				{errors.state && <span className="error">{errors.state}</span>}
			</label>

			<label>Pincode:
				<input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
				{errors.pincode && <span className="error">{errors.pincode}</span>}
			</label>

			<label>Username:
				<input type="username" name="username" value={formData.username} onChange={handleChange} />
				{errors.username && <span className="error">{errors.username}</span>}
			</label>

			<label>Password:
				<input type="password" name="password" value={formData.password} onChange={handleChange} />
				{errors.password && <span className="error">{errors.password}</span>}
			</label>

			<div className="form-check">
			<input
						type="checkbox"
						className="form-check-input"
						id="termsCheck"
						checked={agreeTerms}
						onChange={(e) => setAgreeTerms(e.target.checked)}
						style={{ width: "14px", height: "14px", marginRight: "8px" }}
					/>

				<label className="form-check-label" htmlFor="termsCheck">
					I agree to the{" "}
					<a
						href="http://www.digilaboursolutions.com.s3-website.ap-south-1.amazonaws.com/terms-conditions.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						Terms and Conditions
					</a>
				</label>
				{errors.terms && <span className="error">{errors.terms}</span>}
			</div>

			<button type="submit">Signup</button>
		</form>
	);
}

export default UserSignup;
