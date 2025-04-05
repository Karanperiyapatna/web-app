import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Chatbot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);

	const toggleChatbot = () => {
		setIsOpen(!isOpen);
		if (isOpen) {
			setSelectedOption(null);
		}
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option);
	};

	const styles = {
		chatbotContainer: {
			position: 'fixed',
			bottom: '20px',
			right: '20px',
			zIndex: '1000',
		},
		chatbotIcon: {
			fontSize: '18px',
			padding: '12px 18px',
			borderRadius: '30px',
			transition: '0.3s',
			display: 'flex',
			alignItems: 'center',
			gap: '8px',
			backgroundColor: '#333',
			color: 'white',
			border: 'none',
		},
		chatbotContent: {
			width: '320px',
			borderRadius: '12px',
			overflow: 'hidden',
			boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
			backgroundColor: '#f8f9fa',
		},
		header: {
			fontSize: '16px',
			fontWeight: 'bold',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '10px',
			backgroundColor: '#444',
			color: 'white',
		},
		heading: {
			color: '#007bff', // Blue heading
			fontWeight: 'bold',
			fontSize: '18px',
		},
		bodyText: {
			color: '#333', // Dark grey for readability
			fontSize: '14px',
		},
		buttonOutline: {
			fontSize: '14px',
			fontWeight: 'bold',
			padding: '10px',
			borderRadius: '8px',
			width: '100%',
			marginBottom: '10px',
			backgroundColor: '#f0f0f0',
			color: '#333',
			border: '1px solid #ccc',
		},
		cardBody: {
			padding: '15px',
		},
		linkStyle: {
			textDecoration: 'none',
			color: '#007bff', // Blue links for better visibility
			fontWeight: 'bold',
		},
	};

	return (
		<div style={styles.chatbotContainer}>
			{!isOpen && (
				<button style={styles.chatbotIcon} onClick={toggleChatbot}>
					<i className="bi bi-chat-dots-fill"></i> Chat
				</button>
			)}

			{isOpen && (
				<div className="card" style={styles.chatbotContent}>
					<div style={styles.header}>
						<h5 className="mb-0">Chat Support</h5>
						<button className="btn-close btn-close-white" onClick={toggleChatbot}></button>
					</div>
					<div className="card-body" style={styles.cardBody}>
						{!selectedOption ? (
							<div className="d-flex flex-column">
								<button style={styles.buttonOutline} onClick={() => handleOptionClick('customer')}>
									<i className="bi bi-headset me-2"></i> Customer Support
								</button>
								<button style={styles.buttonOutline} onClick={() => handleOptionClick('marketing')}>
									<i className="bi bi-briefcase-fill me-2"></i> Looking for Job
								</button>
							</div>
						) : (
							<div style={styles.bodyText}>
								{selectedOption === 'customer' ? (
									<div>
										<h6 style={styles.heading}>Customer Support</h6>
										<p>Email: <a href="mailto:customer_support@digilaboursolutions.com" style={styles.linkStyle}>customer_support@digilaboursolutions.com</a></p>
										<p>Phone: <a href="tel:+918080808080" style={styles.linkStyle}>+91-8080808080</a></p>
										<p>Need help? <Link to="/contact_us" style={styles.linkStyle}>Click here</Link></p>
									</div>
								) : (
									<div>
										<h6 style={styles.heading}>Looking for Job</h6>
										<p>Email: <a href="mailto:hr@digilaboursolutions.com" style={styles.linkStyle}>hr@digilaboursolutions.com</a></p>
										<p>Phone: <a href="tel:+919090909080" style={styles.linkStyle}>+91-909090908</a></p>
										<p>Need help? <Link to="/contact_us" style={styles.linkStyle}>Click here</Link></p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Chatbot;
