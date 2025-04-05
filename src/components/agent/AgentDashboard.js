import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AgentDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Extract values safely
    const name = location.state?.name || 'Unknown Agent';
    const userId = location.state?.userId || 'Unknown ID';

    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [creditPoints, setCreditPoints] = useState(0);

    useEffect(() => {
        console.log("Location State:", location.state);

        if (!sessionStorage.getItem('isLoggedIn')) {
            navigate('/AgentLogin');
        } else {
            fetchSubscriptionDetails();
        }
    }, []);

    const fetchSubscriptionDetails = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/agent/subscription/', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setSubscriptionStatus(data.status);
                setCreditPoints(data.credits);
            } else {
                console.error("Failed to fetch subscription details");
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/agent/agent-logout/', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Logout successful!');
                sessionStorage.clear();
                navigate('/AgentLogin');
            } else {
                alert('Logout failed!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container-fluid p-3">
            <div className="d-flex justify-content-between align-items-center p-3 rounded shadow" 
                style={{ backgroundColor: 'white', color: '#333', borderRadius: '10px', border: '1px solid #ddd' }}>
                <h4 style={{ margin: 0, fontWeight: 'bold', color: '#007bff' }}>
                    Welcome, {name} (User ID: {userId})!
                </h4>
                <button className="btn btn-primary" style={{ fontWeight: 'bold', borderRadius: '20px', padding: '5px 20px' }} 
                    onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="mt-3">
                <h5>Subscription Status: {subscriptionStatus || 'Loading...'}</h5>
                <h5>Credit Points: {creditPoints}</h5>
            </div>
        </div>
    );
}

export default AgentDashboard;
