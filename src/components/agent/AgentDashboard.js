import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

function AgentDashboard() {
	const location = useLocation();
	const navigate = useNavigate();

	const name = location.state?.name || 'Unknown Agent';
	const userId = location.state?.userId || 'Unknown ID';
	const user_credits_consumed = location.state?.user_credits_consumed || 0;
	const Total_credit_Point = location.state?.Total_credit_Point || 0;

	const [showModal, setShowModal] = useState(false);
	const [bankDetails, setBankDetails] = useState({
		accountHolder: '',
		bankName: '',
		accountNumber: '',
		ifscCode: '',
	});

	const handleLogout = async () => {
		try {
			const response = await fetch(
                'http://localhost:8000/api/agent/agent-logout/', {
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
			console.error('Error during logout:', error);
		}
	};

	const handleClaimSubmit = async () => {
		try {
			const payload = {
				userId,
				name,
				claimedAmount: user_credits_consumed,

				...bankDetails,
			};

			const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/api/agent/agent-creditclaim/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				alert('Claim submitted successfully!');
				setShowModal(false);
			} else {
				alert('Failed to submit claim.');
			}
		} catch (error) {
			console.error('Error submitting claim:', error);
		}
	};

	const handleInputChange = (e) => {
		setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
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
					<button className="btn btn-danger w-100 fw-bold rounded-pill" onClick={handleLogout}>
						<FaPowerOff className="me-2" />
						Logout
					</button>
				</div>
			</div>

			<div className="row g-4">
				<div className="col-md-4">
					<div className="card shadow-sm h-100 border-success">
						<div className="card-body text-success">
							<h5 className="fw-bold text-dark">Credit Points</h5>
							<p className="fs-5 mb-3 text-dark">{Total_credit_Point}</p>
							<button
                                        className="btn btn-outline-success rounded-pill w-100"
                                        onClick={() => {
                                            if (user_credits_consumed > 100) {
                                                setShowModal(true);
                                            } else {
                                                alert('You should have more than 100 points to claim.');
                                            }
                                        }}
                                    >
								Claim
							</button>
						</div>
					</div>
				</div>
			</div>

			{showModal && (
				<div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Claim Credit</h5>
								<button className="btn-close" onClick={() => setShowModal(false)}></button>
							</div>
							<div className="modal-body">
								<p>You're claiming: <strong>{user_credits_consumed}</strong> points</p>
								<input type="text" className="form-control mb-2" placeholder="Account Holder Name" name="accountHolder" onChange={handleInputChange} />
								<input type="text" className="form-control mb-2" placeholder="Bank Name" name="bankName" onChange={handleInputChange} />
								<input type="text" className="form-control mb-2" placeholder="Account Number" name="accountNumber" onChange={handleInputChange} />
								<input type="text" className="form-control mb-2" placeholder="IFSC Code" name="ifscCode" onChange={handleInputChange} />
							</div>
							<div className="modal-footer">
								<button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
								<button className="btn btn-primary" onClick={handleClaimSubmit}>Submit Claim</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default AgentDashboard;
