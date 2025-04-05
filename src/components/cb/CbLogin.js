import React, { useState } from 'react';

function CbLogin() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await fetch('/CbLogin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
		});
		const data = await response.json();
		console.log(data.message);
	};

	return (
		<form onSubmit={handleLogin}>
			<h2>Commission Based EMpolyee Login</h2>
			<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
			<button type="submit">Login</button>
		</form>
	);
}

export default CbLogin;
