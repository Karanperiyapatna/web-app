import React from 'react';
import "../styles/ContactUs.css";

function UnderMaintenance() {
	return (
		<div className="contact-us-under-dev">
			<i className="fas fa-cogs spinner"></i>
			<h2 className="text-primary">This page is under development</h2>
			<p className="text-secondary">We're working hard to bring it to you soon. Stay tuned!</p>
		</div>
	);
}

export default UnderMaintenance;
