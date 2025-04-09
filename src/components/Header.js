
// import React from 'react';
// import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';

// const App = () => (
//   <Router>
//     {/* Define routes */}
//     <Route path="/static-html" element={<Navigate to="/example.html" />} />
//   </Router>
// );

// export default App;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/Header.css';
// import '../styles/main.css';
import logo from '../images/logo/logo_02.png'; // Importing the logo image
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";



function Header() {

	const [isLookingForWorkOpen, setIsLookingForWorkOpen] = useState(false); // State for "Looking for Work" dropdown
	const [isLoginOpen, setIsLoginOpen] = useState(false); // State for "Login" dropdown


	// State to track sidebar visibility
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Function to toggle the sidebar
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen); 
	};


	return (
		<header>

			<link rel="stylesheet" href="/css/bootstrap.min.css" />		
			{/* <!-- Bootstrap CSS --> */}
			<link rel="stylesheet" href="css/bootstrap.min.css" />
			{/* <!-- Nice Select CSS --> */}
			<link rel="stylesheet" href="css/nice-select.css" />
			{/* <!-- Font Awesome CSS --> */}
			<link rel="stylesheet" href="css/font-awesome.min.css" />
			{/* <!-- icofont CSS --> */}
			<link rel="stylesheet" href="css/icofont.css" />
			{/* <!-- Slicknav --> */}
			<link rel="stylesheet" href="css/slicknav.min.css" />
			{/* <!-- Owl Carousel CSS --> */}
			<link rel="stylesheet" href="css/owl-carousel.css" />
			{/* <!-- Datepicker CSS --> */}
			<link rel="stylesheet" href="css/datepicker.css" />
			{/* <!-- Animate CSS --> */}
			<link rel="stylesheet" href="css/animate.min.css" />
			{/* <!-- Magnific Popup CSS --> */}
			<link rel="stylesheet" href="css/magnific-popup.css" />


			<ul class="pro-features">
				<a className="get-pro" href="#"  onClick={toggleSidebar}   style={{
					display: "block",
					fontWeight: "bold",
					fontSize: "20px",
					padding: "15px 10px",
					borderRadius: "5px",
					textDecoration: "none",
					width: "80px",
					margin: "0 0"
				}}> Prime</a>
				<li class="big-title">Exclusive Benefits with Our Premium Labor Services</li>
				<li class="title">Why Choose Our Premium Plan?</li>
				<li>Access to Verified & Experienced Workers</li>
				<li>Priority Booking & 24/7 Customer Support</li>
				<li>Skilled Workers in 10+ Job Categories</li>
				<li>Flexible Hiring (Hourly, Daily, Monthly)</li>
				<li>Instant Replacement Guarantee</li>
				<div class="button">
				<div 
					style={{ textAlign: "center", marginTop: "15px" }} >
					<a  href="/pre"  style={{
						display: "inline-block",
						padding: "12px 20px",
						background: "#007bff",
						color: "#fff",
						textDecoration: "none",
						borderRadius: "5px",
						fontSize: "16px",
						fontWeight: "bold",
						margin: "5px"
						}} > 
						Prime Plus
					</a>
					
					<a  href="/subscribe-premium"  style={{ display: "inline-block", padding: "12px 20px", background: "#28a745", color: "#fff", textDecoration: "none",
						borderRadius: "5px", fontSize: "16px", fontWeight: "bold", margin: "5px" }} >
						Prime Pro
					</a>
					</div>

				</div>
			</ul>
		
			{/* Sidebar */}
			<div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
				<h2>Exclusive Prime Benefits</h2>
				<p>Unlock the premium features of our services. Enjoy exclusive benefits and access!</p>
				{/* Close Button */}
				<div class="button">
					<a href="/subscription" class="btn">Prime Plus</a>
					<a href="/subscription" class="btn">Prime Pro</a>
				</div>
				<button className="close-btn" onClick={toggleSidebar}> Close </button>
			</div>
				
			<div className="topbar py-2 bg-light d-flex justify-content-between align-items-center flex-wrap"
				style={{
					fontFamily: "'Poppins', sans-serif",
					fontWeight: "400",
					fontSize: "14px",
					color: "#888",
				}} 
			>


	  		<div className="container">
				<div className="row w-100">
		  			<div className="col-lg-6 col-md-5 col-12">
						{/* Contact Links */}
						<ul className="top-link d-flex gap-3 list-unstyled m-0 fs-7" style={{ fontSize: "14px" }} >
							<li style={{ display: "inline-block" }}>
								<a href="/" 
									style={{ textDecoration: "none", color: "#333" }}>Home</a>
							</li>
							<li> <a href="/contact_us" className="text-decoration-none text-muted"> Contact </a> </li>
							<li> <a href="https://stwebsuhas.z13.web.core.windows.net/faq.html" className="text-decoration-none text-muted"> FAQ </a> </li>

							{/* Looking for Work Dropdown */}
							<li style={{ position: "relative" }} 
									onMouseEnter={() => setIsLookingForWorkOpen(true)} 
									onMouseLeave={() => setIsLookingForWorkOpen(false)}>
									<a href="#" style={{ textDecoration: "none", color: "#333" }} onClick={(e) => e.preventDefault()}> Looking for Job <i className="icofont-rounded-down"></i> </a>
						<ul style={{ display: isLookingForWorkOpen ? "block" : "none",
											position: "absolute",
											background: "#fff",
											boxShadow: "0 0 10px rgba(0,0,0,0.1)",
											padding: "8px",
											borderRadius: "5px",
											zIndex: 999,
											margin: "0", top: "100%", left: "-20px", width: "220px", }} >
										<li style={{ padding: "8px 0", borderBottom: "1px dashed #ddd" }} >
											<a href="/emp_babyCaretaker"
												style={{ textDecoration: "none", color: "#444", fontSize: "14px",
													fontFamily: "Arial, sans-serif",
													}}
												onMouseOver={(e) => (e.target.style.color = "#000")}
												onMouseOut={(e) => (e.target.style.color = "#444")} 										>
												Baby Caretaker
											</a>
										</li>
										<li style={{ padding: "8px 0", borderBottom: "1px dashed #ddd" }} >
											<a href="/emp_ElderCare "
												style={{
													textDecoration: "none",
													color: "#444",
													fontSize: "14px",
													fontFamily: "Arial, sans-serif",
												}}
											onMouseOver={(e) => (e.target.style.color = "#000")}
											onMouseOut={(e) => (e.target.style.color = "#444")}
											> Elder Caretaker
											</a>
										</li>
										<li style={{ padding: "8px 0", borderBottom: "1px dashed #ddd" }} >
											<a  href="/emp_Cooking"
												style={{ textDecoration: "none", color: "#444", fontSize: "14px", fontFamily: "Arial, sans-serif", }}
												onMouseOver={(e) => (e.target.style.color = "#000")}
												onMouseOut={(e) => (e.target.style.color = "#444")} >
											Cooking
											</a>
										</li>
										<li style={{ padding: "8px 0", borderBottom: "1px dashed #ddd" }} >
											<a href="/emp_housekeeping"
											style={{
												textDecoration: "none", color: "#444", fontSize: "14px", fontFamily: "Arial, sans-serif",
											}}
											onMouseOver={(e) => (e.target.style.color = "#000")}
											onMouseOut={(e) => (e.target.style.color = "#444")} >
											Housekeeping </a>
										</li>
										<li style={{ padding: "8px 0", borderBottom: "1px dashed #ddd" }} >
											<a href="/emp_helper"
											style={{
												textDecoration: "none", color: "#444", fontSize: "14px", fontFamily: "Arial, sans-serif",
											}}
											onMouseOver={(e) => (e.target.style.color = "#000")}
											onMouseOut={(e) => (e.target.style.color = "#444")} >
											Helper </a>
										</li>
										<li style={{ padding: "8px 0", borderBottom: "1px dashed #ddd" }} >
											<a href="/emp_Otherservices"
											style={{ textDecoration: "none", color: "#444", fontSize: "14px", fontFamily: "Arial, sans-serif", }}
											onMouseOver={(e) => (e.target.style.color = "#000")}
											onMouseOut={(e) => (e.target.style.color = "#444")} >
											Other Services </a>
										</li>

									</ul>

								</li>
								{/* Looking for the Job Closed */}
					</ul>
				</div>

				<div className="col-lg-6 col-md-7 col-12 d-flex justify-content-md-end justify-content-start">
					{/* Contact Info */}
					<ul className="top-contact d-flex gap-3 align-items-center list-unstyled m-0">
					<li className="text-muted"> <i className="fa fa-phone me-1"></i> +91-9986909171 </li>
					<li className="text-muted">
						<i className="fa fa-envelope me-1"></i>
						<a href="mailto:support@yourmail.com"
						className="text-decoration-none text-muted"
						> support@digilaboursolution.com </a>
					</li>
					</ul>
				</div>
				</div>
			</div>
			</div>
						
			{/* Header Inner */}
			<div style={{
				backgroundColor: "#fff",
				padding: "8px 0",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexWrap: "wrap",
				width: "100%", maxWidth: "1000px", margin: "0 auto"
			}}>
				<div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
						
						{/* Logo */}
						<div style={{ flex: "1", display: "flex", alignItems: "center", padding: "5px" }}>
							<a href="/">
								<img src="img/logo.png" alt="logo" style={{ height: "100%", width: "auto", maxHeight: "50px", objectFit: "contain" }} />
							</a>
						</div>


						{/* Navigation */}
						<nav style={{ flex: "3", textAlign: "right" }}>
							<ul style={{
								display: "flex",
								gap: "20px",
								listStyle: "none",
								padding: 0,
								margin: 0,
								alignItems: "center"
							}}>

								<li style={{ display: "inline-block" }}>
									<a href="/" style={{ textDecoration: "none", color: "#333" }}>Services</a>
								</li>

								<li>
									<a href="https://stwebsuhas.z13.web.core.windows.net/about.html" className="text-decoration-none text-muted"> About </a>
								</li>

								{/* Login Dropdown */}
								<li style={{ position: "relative" }} 
									onMouseEnter={() => setIsLoginOpen(true)} 
									onMouseLeave={() => setIsLoginOpen(false)}>
									<a href="#" style={{ textDecoration: "none", color: "#333" }} onClick={(e) => e.preventDefault()}>
										Login <i className="icofont-rounded-down"></i>
									</a>
									<ul style={{ display: isLoginOpen ? "block" : "none", position: "absolute", background: "#fff",
										boxShadow: "0 0 10px rgba(0,0,0,0.1)",
										padding: "10px",
										borderRadius: "5px",
										zIndex: 999,
										margin: "0",
										top: "100%",
										left: "0"
									}}>
										<li style={{ padding: "6px 0", fontSize: "14px", display: "flex", alignItems: "center" }}>
											<a href="/UserLogin" style={{ textDecoration: "none", color: "#333" }}>
												Login
											</a>
										</li>
										<li style={{ padding: "6px 0", fontSize: "14px", display: "flex", alignItems: "center" }}>
											<a href="/UserSignup" style={{ textDecoration: "none", color: "#333" }}>
												User Signup
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</nav>

					</div>
				</div>



			</div>
			{/* <!--/ End Header Inner --> */}

		</header>
	);
}

export default Header;
