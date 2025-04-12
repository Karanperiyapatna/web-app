import React, { useState } from 'react';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${process.env.API_BASE_URL}/UserLogin`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));

			
			const data = await response.json();
			if (response.ok) {
				console.log(data.message);
				// Handle successful login (e.g., redirect to dashboard)
			} else {
				console.error('Login failed:', data.message);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<h2>Login</h2>
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
			<button type="submit">Login</button>
		</form>
	);
}

export default Login;
