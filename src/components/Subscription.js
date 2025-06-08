import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const [username, setUsername] = useState('');
  const [plan, setPlan] = useState('plus');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [subscriptionAmount, setSubscriptionAmount] = useState(50);
  const [discountedAmount, setDiscountedAmount] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [remainingDays, setRemainingDays] = useState(0);
  const [creditPoints, setCreditPoints] = useState(0);

  const navigate = useNavigate();

  const togglePlan = (selectedPlan) => {
    setPlan(selectedPlan);
    setSubscriptionAmount(selectedPlan === 'plus' ? 50 : 100);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setStep(1);
    setError(null);
    setDiscountedAmount(null);
    setSubscriptionStatus(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStep(1);
    setUsername('');
    setMobileNumber('');
    setError(null);
    setDiscountedAmount(null);
    setSubscriptionStatus(null);
    setRemainingDays(0);
    setCreditPoints(0);
  };

  const handleNext = async () => {
    if (!username || !mobileNumber) {
      setError('Please enter both username and mobile number.');
      return;
    }

    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/check_subscription_user/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          mobile_number: mobileNumber.trim(),
          amount: subscriptionAmount,
          subscription_type: plan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'User not found or invalid input.');
        return;
      }

      setSubscriptionStatus(data.subscription_status);
      setCreditPoints(data.credit_points || 0);
      setDiscountedAmount(data.discounted_amount ?? subscriptionAmount);
      setRemainingDays(data.days_left || 0);
      setStep(2);
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center fw-bold text-dark">Choose Your Plan</h1>
      <div className="d-flex justify-content-center">
        <button
          className={`btn btn-lg m-2 ${plan === 'plus' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => togglePlan('plus')}
        >
          <i className="bi bi-star-fill me-1"></i> Prime Plus
        </button>
        <button
          className={`btn btn-lg m-2 ${plan === 'pro' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => togglePlan('pro')}
        >
          <i className="bi bi-award-fill me-1"></i> Prime Pro
        </button>
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
              <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i> Affordable pricing</li>
              <li className="list-group-item"><i className="bi bi-gift-fill text-warning me-2"></i> Rewards on renewal</li>
            </>
          ) : (
            <>
              <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i> Access to all services</li>
              <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i> Unlimited mobile numbers</li>
              <li className="list-group-item"><i className="bi bi-headset text-primary me-2"></i> Premium support</li>
              <li className="list-group-item"><i className="bi bi-lightning-fill text-danger me-2"></i> Fast processing</li>
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
                    <label className="fw-bold text-dark">Enter Username</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="fw-bold text-dark mt-3">Enter Mobile Number</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Enter Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />

                    {error && <div className="alert alert-danger mt-2">{error}</div>}

                    <button className="btn btn-primary mt-3 w-100" onClick={handleNext}>
                      Next <i className="bi bi-arrow-right"></i>
                    </button>
                  </>
                )}

                {step === 2 && (
                  <div className="p-3 border rounded" style={{ backgroundColor: "#f0f8ff" }}>
                    <h5 className="fw-bold text-dark">Subscription Info</h5>

                    <p className=" text-dark"><strong> Username:</strong> {username}</p>
                    <p className=" text-dark"><strong> Mobile Number:</strong> {mobileNumber}</p>
                    <p className=" text-dark"><strong> Plan:</strong> {plan === 'plus' ? 'Prime Plus' : 'Prime Pro'}</p>

                    {subscriptionStatus === 1 ? (
                      <p className="text-success fw-bold">✅ Subscription Active - {remainingDays} days remaining</p>
                    ) : (
                      <>
                        <p className="text-danger fw-bold">❌ Subscription Inactive</p>
                        <p className=" text-dark"><strong>💰 Amount to Pay:</strong> ₹{discountedAmount || subscriptionAmount}</p>
                        <button
                            className="btn btn-success w-100 mt-2"
                            onClick={() =>
                              navigate('/PaymentSubscriptionProcess', {
                                state: {
                                  username,
                                  mobileNumber,
                                  plan,
                                  discountedAmount,
                                },
                              })
                            }
                          >
                            <i className="bi bi-credit-card-fill me-2"></i> Proceed to Payment
                          </button>
                      </>
                    )}
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
