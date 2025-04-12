import React, { useEffect, useState, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
	const [users, setUsers] = useState([]);
	const [activeTab, setActiveTab] = useState('orders');

	useEffect(() => {
		fetch(
			`${process.env.API_BASE_URL}/api/dashboard`)
			.then(response => response.json())
			.then(data => setUsers(data))
			.catch(error => console.error('Error:', error));
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				{/* Sidebar */}
				<nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar text-white p-3">
					<h4 className="text-center">Dashboard</h4>
					<ul className="nav flex-column">
						<li className="nav-item">
							<button className={`nav-link text-white ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
						</li>
						<li className="nav-item">
							<button className={`nav-link text-white ${activeTab === 'subscriptions' ? 'active' : ''}`} onClick={() => setActiveTab('subscriptions')}>Subscription Details</button>
						</li>
					</ul>
				</nav>

				{/* Main Content */}
				<main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
					<h2 className="mb-4">{activeTab === 'orders' ? 'Orders' : 'Subscription Details'}</h2>

					{activeTab === 'orders' && (
						<div>
							<h4>Order List</h4>
							<ul className="list-group">
								{users.map((user, index) => (
									<li key={index} className="list-group-item">{user.username}'s Order</li>
								))}
							</ul>
						</div>
					)}

					{activeTab === 'subscriptions' && (
						<div>
							<h4>Subscription Details</h4>
							<p>Here you can view and manage subscription details.</p>
						</div>
					)}
				</main>
			</div>
		</div>
	);
}

export default Dashboard;
