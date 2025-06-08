import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // also fix navigate usage

const PaymentSubscriptionProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [status, setStatus] = useState('processing');
  const [transactionId, setTransactionId] = useState('');

  const [creditPoints, setCreditPoints] = useState(0);
  const [remainingDays, setRemainingDays] = useState(30);

  useEffect(() => {
    if (state) {
      console.log("Received state in PaymentSubscriptionProcess:", state);
    }
  }, [state]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
      generateTransactionId();

      // Calculate credit points based on plan
      const points = state?.plan === 'plus' ? 100 : 50;
      setCreditPoints(points);
      setRemainingDays(30); // Or dynamic if needed
    }, 5000);
    return () => clearTimeout(timer);
  }, [state]);

  const generateTransactionId = () => {
    const id = 'TXN' + Math.floor(100000000 + Math.random() * 900000000);
    setTransactionId(id);
  };

  if (!state) {
    return <div className="text-danger fw-bold">Invalid navigation. Please go back and try again.</div>;
  }

  const { username, mobileNumber, plan, discountedAmount } = state;

  return (
    <div className="container mt-5 text-center">
      {status === 'processing' ? (
        <>
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Processing...</span>
          </div>
          <h2 className="text-primary">Payment is Processing...</h2>
        </>
      ) : (
        <>
          <h2 className="text-success fw-bold">✅ Payment Successful!</h2>
          <p className="fs-5 mt-3 text-dark">Your transaction has been completed.</p>
          <div className="alert alert-info fw-bold mt-4">
            Transaction ID: {transactionId}
          </div>

          <div className="text-start mt-4 border p-3 rounded shadow-sm">
            <h5 className="fw-bold text-dark">🔍 Transaction Details</h5>
            <p className='text-dark'><strong>👤 Username:</strong> {username}</p>
            <p  className='text-dark'><strong>📞 Mobile Number:</strong> {mobileNumber}</p>
            <p  className='text-dark'><strong>🧾 Plan:</strong> {plan === 'plus' ? 'Prime Plus' : 'Prime Pro'}</p>
            <p  className='text-dark'><strong>💰 Amount Paid:</strong> ₹{discountedAmount}</p>
            <p  className='text-dark'><strong>🏆 Credit Points:</strong> {creditPoints}</p>
            <p  className='text-dark'><strong>📅 Valid for:</strong> {remainingDays} days</p>
          </div>

          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Go to Home
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentSubscriptionProcess;
