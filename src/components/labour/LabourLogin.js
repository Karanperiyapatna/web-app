import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LabourLogin() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [serviceCategory, setServiceCategory] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_BASE_URL}/api/labour/labour-login/`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username, password, service_category: serviceCategory }),
					credentials: 'include',
				}
			);
			const data = await response.json();
			console.log('Response Data:', data);

			if (response.ok) {
				console.log('Login successful:', data);
				sessionStorage.setItem('isLoggedIn', 'true');
				sessionStorage.setItem('labour_id', data.labour_id);
				sessionStorage.setItem('labourName', data.labour_name);
				navigate('/LabourDashboard', {
					state: { 
						labour_name: data.labour_name, 
						labour_id: data.labour_id,
						user_credits_consumed : data.user_credits_consumed,
						referred_transaction_credits_consumed : data.referred_transaction_credits_consumed,
						Total_credit_Point : data.Total_credit_Point,
					},
				});
			} else {
				console.error('Login failed:', data.message);
				alert('Login failed: ' + data.message);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred during login.');
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<h2>Labour Login</h2>
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
				required
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				required
			/>
			<select
				value={serviceCategory}
				onChange={(e) => setServiceCategory(e.target.value)}
				required
			>
				<option value="" disabled>Select Service Category</option>
				<option value="babycaretaker">Baby Caretaker</option>
				<option value="eldercaretaker">Elder Caretaker</option>
				<option value="housekeeping">Housekeeping</option>
				<option value="cooking">Cook</option>
				<option value="driver">Driver</option>
			</select>
			<button type="submit">Login</button>
		</form>
	);
}

export default LabourLogin;
