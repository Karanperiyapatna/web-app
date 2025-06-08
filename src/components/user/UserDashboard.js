import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UserDashboard() {
	const location = useLocation();
	const { name, userId } = location.state || { name: 'Unknown User', userId: 'Unknown ID' };
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState('orders');
	const [subscriptionStatus, setSubscriptionStatus] = useState(null);
	const [creditPoints, setCreditPoints] = useState(0);

	useEffect(() => {
		if (!sessionStorage.getItem('isLoggedIn')) {
			navigate('/UserLogin');
		} else {
			fetchSubscriptionDetails();
		}
	}, []);

	const fetchSubscriptionDetails = async () => {
		try {
			const response = await fetch(`http://localhost:8000/api/user/subscription-status/${userId}/`);
			if (response.ok) {
				const data = await response.json();
				setSubscriptionStatus(data.subscription_status);
				setCreditPoints(data.credit_points);
			} else {
				console.error("Failed to fetch subscription details");
			}
		} catch (error) {
			console.error("Error fetching subscription details:", error);
		}
	};

	const handleLogout = async () => {
		try {
			const response = await fetch('http://localhost:8000/api/user/user-logout/', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				alert('Logout successful!');
				sessionStorage.clear();
				navigate('/UserLogin');
			} else {
				alert('Logout failed!');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div className="container-fluid p-4">
			<div className="row align-items-center bg-white shadow rounded p-3 mb-4" style={{ border: '1px solid #ddd' }}>
				<div className="col-md-9">
					<h4 className="mb-0 fw-bold text-dark">
						Welcome, {name} (User ID: {userId})
					</h4>
				</div>
				<div className="col-md-3 text-end">
					<button className="btn btn-primary w-100 fw-bold rounded-pill" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>

			<div className="row">
				<div className="col-md-3 mb-3">
					<div className="list-group">
						<button className={`list-group-item list-group-item-action ${activeSection === 'orders' ? 'active' : ''}`} onClick={() => setActiveSection('orders')}>Orders</button>
						<button className={`list-group-item list-group-item-action ${activeSection === 'subscriptions' ? 'active' : ''}`} onClick={() => setActiveSection('subscriptions')}>
							Subscriptions ({subscriptionStatus === 0 ? "Inactive" : "Active"})
						</button>
					</div>
				</div>

				<div className="col-md-9">
					<div className="card p-4 shadow-sm">
						{activeSection === 'orders' && (
							<div className="text-black">
								<h2 className="fw-bold">Your Orders</h2>
								<p className='text-dark'>Order details will be displayed here...</p>
							</div>
						)}
						{activeSection === 'subscriptions' && (
							<div className="text-black">
								<h2 className="fw-bold text-dark">Your Subscription</h2>
								<p className='text-dark'><strong>Status:</strong> {subscriptionStatus === 0 ? "Inactive" : "Active"}</p>
								<p className='text-dark'><strong>Credit Points:</strong> {creditPoints}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserDashboard;
