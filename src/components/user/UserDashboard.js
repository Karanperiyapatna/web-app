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
        <div className="container-fluid p-3">
            <div className="d-flex justify-content-between align-items-center p-3 rounded shadow" style={{ backgroundColor: 'white', color: '#333', borderRadius: '10px', border: '1px solid #ddd' }}>
                <h4 style={{ margin: 0, fontWeight: 'bold', color: '#007bff' }}>
                    Welcome, {name} (User ID: {userId})!
                </h4>
                <button className="btn btn-primary" style={{ fontWeight: 'bold', borderRadius: '20px', padding: '5px 20px', transition: '0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="list-group">
                        <button className={`list-group-item list-group-item-action ${activeSection === 'orders' ? 'active' : ''}`} onClick={() => setActiveSection('orders')}>Orders</button>
                        <button className={`list-group-item list-group-item-action ${activeSection === 'subscriptions' ? 'active' : ''}`} onClick={() => setActiveSection('subscriptions')}>
                            Subscriptions ({subscriptionStatus === 0 ? "Inactive" : "Active"})
                        </button>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="card p-3">
                        {activeSection === 'orders' && (
                            <div>
                                <h2>Your Orders</h2>
                                <p>Order details will be displayed here...</p>
                            </div>
                        )}
                        {activeSection === 'subscriptions' && (
                            <div>
                                <h2>Your Subscription</h2>
                                <p><strong>Status:</strong> {subscriptionStatus === 0 ? "Inactive" : "Active"}</p>
                                <p><strong>Credit Points:</strong> {creditPoints}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
