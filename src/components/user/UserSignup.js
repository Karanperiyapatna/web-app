import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSignup() {
	const [name, setName] = useState('');
	const [mobilenumber, setMobileNumber] = useState('');
	const [alternativemobilenumber, setAlternativeMobileNumber] = useState('');
	const [mailid, setMailID] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [area, setArea] = useState('');
	const [pincode, setPincode] = useState('');
	const [state, setState] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	// Area options based on the selected city
	const areaOptions = {
		mysore: ['JP Nagar', 'Vijayanagar', 'Gokulam'],
		bangalore: ['Whitefield', 'Indiranagar', 'Jayanagar'],
		chennai: ['Anna Nagar', 'T. Nagar', 'Velachery']
	};

	const handleSignup = async (e) => {
		e.preventDefault();
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
		formData.append('password', password);
		
		try {
			const response = await fetch('http://127.0.0.1:8000/api/user/user-signup/', {
				method: 'POST',
				body: formData,
			});
			const data = await response.json();
			if (response.ok) {
				alert('Signup Successful');
				console.log('User ID:', data.user_id);
				navigate('/UserDashboard', { state: { name: name, userId: data.user_id } });
			} else {
				alert('Signup Failed: ' + data.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<form onSubmit={handleSignup}>
			<h2>Signup</h2>
			<input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
			<input type="text" value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Mobile Number" required />
			<input type="text" value={alternativemobilenumber} onChange={(e) => setAlternativeMobileNumber(e.target.value)} placeholder="Alternative Mobile Number" required />
			<input type="email" value={mailid} onChange={(e) => setMailID(e.target.value)} placeholder="Email" required />
			<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
			
			{/* City Dropdown */}
			<label>City:
				<select value={city} onChange={(e) => {
					setCity(e.target.value);
					setArea(''); // Reset area when changing city
				}} required>
					<option value="">Select City</option>
					<option value="mysore">Mysore</option>
					<option value="bangalore">Bangalore</option>
					<option value="chennai">Chennai</option>
				</select>
			</label>

			{/* Area Dropdown (Dynamic based on city) */}
			<label>Area:
				<select value={area} onChange={(e) => setArea(e.target.value)} required disabled={!city}>
					<option value="">Select Area</option>
					{city && areaOptions[city.toLowerCase()]?.map((area) => (
						<option key={area} value={area}>{area}</option>
					))}
				</select>
			</label>

			<input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
			<input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" required />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
			<button type="submit">Signup</button>
		</form>
	);
}

export default UserSignup;
