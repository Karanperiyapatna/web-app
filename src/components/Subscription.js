import React, { useState } from 'react';

const Subscription = () => {
	const [plan, setPlan] = useState('plus');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [mobileNumber, setMobileNumber] = useState('');
	const [additionalDetails, setAdditionalDetails] = useState('');
	const [subscriptionAmount, setSubscriptionAmount] = useState(50);
	const [discountedAmount, setDiscountedAmount] = useState(null);
	const [subscriptionStatus, setSubscriptionStatus] = useState(null);
	const [error, setError] = useState(null);
	const [step, setStep] = useState(1);

	const togglePlan = (selectedPlan) => {
		setPlan(selectedPlan);
		setSubscriptionAmount(selectedPlan === 'plus' ? 50 : 100);
	};

	const openModal = () => {
		setIsModalOpen(true);
		setStep(1);
		setDiscountedAmount(null);
		setAdditionalDetails('');
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleMobileNumberChange = (e) => {
		setMobileNumber(e.target.value);
	};

	const handleAdditionalDetailsChange = (e) => {
		setAdditionalDetails(e.target.value);
	};

	const handleNext = () => {
		if (step === 1 && mobileNumber) {
			setStep(2);
		} else if (step === 2) {
			fetchDiscountedAmount();
		} else {
			setError("Please complete all required fields.");
		}
	};

	const [creditPoints, setCreditPoints] = useState(0);

	const fetchDiscountedAmount = async () => {
		setError(null);
		const requestBody = {
			mobile_number: mobileNumber,
			additional_details: additionalDetails,
			amount: subscriptionAmount
		};
	
		try {
			const response = await fetch(
				`${process.env.API_BASE_URL}/api/check-subscription/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody)
			});
	
			const data = await response.json();
			
			// Extract values from the response
			setDiscountedAmount(data.discounted_amount || 0);
			setCreditPoints(data.credit_points || 0);
			setSubscriptionStatus(data.subscription_status);
			setStep(3);
		} catch (error) {
			console.error("Error fetching subscription data:", error);
			setError("Something went wrong! Please try again.");
		}
	};
	

	return (
		<div className="container mt-5">
			<h1 className="mb-4 text-center fw-bold text-dark">Choose Your Plan</h1>
			<div className="d-flex justify-content-center">
				<button  className={`btn btn-lg m-2 ${plan === 'plus' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => togglePlan('plus')}> <i className="bi bi-star-fill me-1"></i> Prime Plus</button>
				<button  className={`btn btn-lg m-2 ${plan === 'pro' ? 'btn-success' : 'btn-outline-success'}`}  onClick={() => togglePlan('pro')}><i className="bi bi-award-fill me-1"></i> Prime Pro </button>
			</div>

			<div className="card shadow-lg p-4 mt-4 border-0" style={{ backgroundColor: plan === 'pro' ? '#e9f7ef' : '#f8f9fa' }}>
				<h2 className={`fw-bold ${plan === 'plus' ? 'text-primary' : 'text-success'}`}>
					{plan === 'plus' ? '🔥 Prime Plus Benefits' : '🚀 Prime Pro Benefits'}
				</h2>
				<p className="fs-5 fw-semibold text-muted">Starting at <span className="fw-bold text-dark">₹{subscriptionAmount}</span> per month</p>
				<ul className="list-group list-group-flush">

				{plan === 'plus' ? (
					<>
						<li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i> Access to any service</li>
						<li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i> Limited to one mobile number</li>
						<li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i> Affordable pricing with flexible plans</li>
						<li className="list-group-item"><i className="bi bi-gift-fill text-warning me-2"></i> Earn rewards on every renewal</li>
					</>
				) : (
					<>
						<li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i> Access to all services</li>
						<li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i> Unlimited mobile numbers</li>
						<li className="list-group-item"><i className="bi bi-headset text-primary me-2"></i> Premium customer support</li>
						<li className="list-group-item"><i className="bi bi-lightning-fill text-danger me-2"></i> Faster processing time</li>
					</>
				)}
			</ul>
				<button className="btn btn-lg btn-primary mt-4 w-100 shadow-sm" onClick={openModal}>
					<i className="bi bi-cart-check-fill me-2"></i> Subscribe Now
				</button>
			</div>

			{isModalOpen && (
				<div className="modal d-block fade show" tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header bg-primary text-white">
								<h5 className="modal-title fw-bold">Subscription Process</h5>
								<button type="button" className="btn-close text-white" onClick={closeModal}></button>
							</div>
							<div className="modal-body">
								{step === 1 && (
									<>
										<label className="fw-bold text-dark">Enter Mobile Number</label>
										<input type="text" className="form-control mt-2" placeholder="Enter Mobile Number" value={mobileNumber} onChange={handleMobileNumberChange} />
										<button className="btn btn-primary mt-3 w-100" onClick={handleNext}>Next <i className="bi bi-arrow-right"></i></button>
									</>
								)}
								{step === 2 && (
									<>
										<label className="fw-bold text-dark">Enter Additional Details</label>
										<input type="text" className="form-control mt-2" placeholder="Additional Details" value={additionalDetails} onChange={handleAdditionalDetailsChange} />
										<button className="btn btn-primary mt-3 w-100" onClick={handleNext}>Next <i className="bi bi-arrow-right"></i></button>
									</>
								)}

								{step === 3 && discountedAmount !== null && (
									<div className="p-3 border rounded" style={{ backgroundColor: "#f0f8ff" }}>
										<h5 className="fw-bold text-dark">Subscription Details</h5>

										<p className="fw-bold">
											<span style={{ color: "#007bff" }}>📞 Mobile Number:</span>
											<span className="ms-2 text-dark">{mobileNumber}</span>
										</p>

										<p className="fw-bold">
											<span style={{ color: "#28a745" }}>✅ Subscription Status:</span>
											<span className="ms-2" style={{ color: subscriptionStatus === 1 ? "#28a745" : "#dc3545" }}>
												{subscriptionStatus === 1 ? "Active" : "Inactive"}
											</span>
										</p>

										<p className="fw-bold">
											<span style={{ color: "#ff9900" }}>🏆 Credit Points:</span>
											<span className="ms-2 text-dark">{creditPoints}</span>
										</p>

										<p className="fw-bold">
											<span style={{ color: "#dc3545" }}>💰 Discounted Amount:</span>
											<span className="ms-2 fw-bold" style={{ color: "#28a745" }}>₹{discountedAmount}</span>
										</p>

										<a 
											href="/payment" 
											target="_blank" 
											rel="noopener noreferrer"
											className="btn btn-success mt-3 w-100"
										>
											<i className="bi bi-credit-card-fill me-2"></i> Proceed to Payment
										</a>

									</div>
								)}



							</div>
						</div>
					</div>
				</div>
			)}


		</div>
	);
};

export default Subscription;