import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log("Sending login request with:", username, password);
	
		try {
			const response = await fetch('http://127.0.0.1:8000/api/user/user-login/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
				credentials: 'include',
			});
	
			console.log("Response status:", response.status);
			const data = await response.json();
			console.log("Response data:", data);
	
			if (response.ok) {
				console.log("Login successful, navigating to dashboard...");
				
				sessionStorage.setItem('isLoggedIn', 'true');
				sessionStorage.setItem('userId', data.user_id);
				sessionStorage.setItem('userName', data.name);
				console.log("Before navigate() call");
				navigate('/UserDashboard', { state: { name: data.name, userId: data.user_id } });
				console.log("After navigate() call");
	
			} else {
				console.log("Login failed:", data.error);
				setError(data.error || 'Invalid login credentials');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred during login.');
		}
	};
	
	return (
		<form onSubmit={handleLogin}>
			<br></br>

			<h2>Login</h2>
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
			<button type="submit">Login</button>
		</form>
	);
}

export default Login;
