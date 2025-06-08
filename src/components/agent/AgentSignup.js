import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AgentSignup() {
	const [name, setName] = useState('');
	const [mobilenumber, setMobileNumber] = useState('');
	const [alternativemobilenumber, setAlternativeMobileNumber] = useState('');
	const [mailid, setMailID] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [area, setArea] = useState('');
	const [pincode, setPincode] = useState('');
	const [state, setState] = useState('');
	const [username, setusername] = useState('');
	const [password, setPassword] = useState('');
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const areaOptions = {
		mysore: ['JP Nagar', 'Vijayanagar', 'Gokulam'],
		bangalore: ['Whitefield', 'Indiranagar', 'Jayanagar'],
		chennai: ['Anna Nagar', 'T. Nagar', 'Velachery']
	};

	const handleSignup = async (e) => {
		e.preventDefault();

		if (!agreedToTerms) {
			setErrorMessage("You must agree to the Terms and Conditions.");
			return;
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('mobile_number', mobilenumber);
		formData.append('alt_mobile_number', alternativemobilenumber);
		formData.append('email', mailid);
		formData.append('address', address);
		formData.append('city', city);
		formData.append('area', area);
		formData.append('state', state);
		formData.append('pincode', pincode);
		formData.append('username', username);
		formData.append('password', password);
		formData.append('agreedToTerms', agreedToTerms);

		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/api/agent/agent-signup/`, {
				
				method: 'POST',
				body: formData,
			});
			const data = await response.json();
			if (response.ok) {
				alert('Signup Successful');
				navigate('/UserDashboard', { state: { name: name, userId: data.user_id } });
			} else {
				alert('Signup Failed: ' + data.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className="container mt-4">
			<h2 className="mb-4 text-center">Agent Signup</h2>
			<form onSubmit={handleSignup} className="p-4 border rounded shadow-sm bg-light">

				<div className="form-group">
					<input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
				</div>

				<div className="form-group">
					<input className="form-control" type="text" value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Mobile Number" required />
				</div>

				<div className="form-group">
					<input className="form-control" type="text" value={alternativemobilenumber} onChange={(e) => setAlternativeMobileNumber(e.target.value)} placeholder="Alternative Mobile Number" required />
				</div>

				<div className="form-group">
					<input className="form-control" type="email" value={mailid} onChange={(e) => setMailID(e.target.value)} placeholder="Email" required />
				</div>

				<div className="form-group">
					<input className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
				</div>

				<div className="form-group">
					<select className="form-control" value={city} onChange={(e) => { setCity(e.target.value); setArea(''); }} required>
						<option value="">Select City</option>
						<option value="mysore">Mysore</option>
						<option value="bangalore">Bangalore</option>
						<option value="chennai">Chennai</option>
					</select>
				</div>

				<div className="form-group">
					<select className="form-control" value={area} onChange={(e) => setArea(e.target.value)} required disabled={!city}>
						<option value="">Select Area</option>
						{city && areaOptions[city.toLowerCase()]?.map((area) => (
							<option key={area} value={area}>{area}</option>
						))}
					</select>
				</div>

				<div className="form-group">
					<input className="form-control" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
				</div>

				<div className="form-group">
					<input className="form-control" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" required />
				</div>

				<div className="form-group">
					<input className="form-control" type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder="Username" required />
				</div>

				<div className="form-group">
					<input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
				</div>

				<div className="form-group form-check d-flex align-items-center">
					<input
						type="checkbox"
						className="form-check-input"
						id="termsCheck"
						checked={agreedToTerms}
						onChange={(e) => setAgreedToTerms(e.target.checked)}
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
				</div>

				{errorMessage && (
					<div className="text-danger mb-3">{errorMessage}</div>
				)}

				<button type="submit" className="btn btn-primary w-100">Signup</button>
			</form>
		</div>
	);
}

export default AgentSignup;
