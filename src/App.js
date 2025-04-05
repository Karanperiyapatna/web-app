import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './styles/main.css';
import './styles/Footer.css';
import './styles/Header.css';




import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import UnderMaintenance from './components/under-maintenance';

import Userpage from './components/Userpage';
import UserLogin from './components/user/UserLogin';
import UserSignup from './components/user/UserSignup';
import UserDashboard from './components/user/UserDashboard';

import LabourPage from './components/LabourPage';
import LabourLogin from './components/labour/LabourLogin';
import LabourSignup from './components/labour/LabourSignup';
import LabourDashboard from './components/labour/LabourDashboard';

import AgentLogin from './components/agent/AgentLogin';
import AgentSignup from './components/agent/AgentSignup';
import AgentDashboard from './components/agent/AgentDashboard';

import CbLogin from './components/cb/CbLogin';
import CbSignup from './components/cb/CbSignup';

import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

import LegalInformation from './components/LegalInformation';
import Chatbot from './components/Chatbot';
import Subscription from './components/Subscription';


import AgentRegistrationPage from './components/AgentRegistrationPage';

import SleepingPartnerPage from './components/SleepingPartnerPage';
import OtherServices from './components/OtherServices';

import BabyCaretaker from './components/workerspage/BabyCaretaker';
import ElderCare from './components/workerspage/ElderCare';
import Cooking from './components/workerspage/Cooking';
import Cleaning from './components/workerspage/Cleaning';
import AcRepair from './components/workerspage/AcRepair';
import Helper from './components/workerspage/Helper';
import ElectricalService from './components/workerspage/ElectricalService';
import TankCleaner from './components/workerspage/TankCleaner';
import DrinkingWater from './components/workerspage/DrinkingWater';
import VehicleInsuranceAgent from './components/workerspage/VehicleInsuranceAgent';
import LifeInsuranceAgent from './components/workerspage/LifeInsuranceAgent';
import Gardening from './components/workerspage/Gardening';
import CarDriver from './components/workerspage/CarDriver';
import PackersMovers from './components/workerspage/PackersMovers';
import PlumberService from './components/workerspage/PlumberService';



import EmpBabyCaretaker from './components/workerspage/EmpBabyCaretaker';
import EmpElderCare from './components/workerspage/EmpElderCare';
import EmpCooking from './components/workerspage/EmpCooking';
import EmpCleaning from './components/workerspage/EmpCleaning';
import EmpTankcleaner from './components/workerspage/EmpTankCleaner';
import EmpDriver from './components/workerspage/EmpDriver';
import EmpOtherservice from './components/workerspage/EmpOtherservice';
import EmpLogistics from './components/workerspage/EmpLogistics';
import EmpHelper from './components/workerspage/EmpHelper';


import LabourList from "./components/LabourList";

// import EmpBabyCaretaker from './components/looking_job/EmpBabyCaretaker';

import babycaretaker from '../src/images/main/babycaretaker.jpg';
import eldercaretaker from '../src/images/main/eldercaretaker.jpg';
import cleaner from '../src/images/main/cleaner.jpg';
import cooking from '../src/images/main/cooking.jpg';
import acRepair from '../src/images/main/electrical.jpg';
import painter from '../src/images/main/painter.jpg';
import gardening from '../src/images/main/gardening.jpg';
import industryHelper from '../src/images/main/industrail_helper.jpg';
import officeCleaner from '../src/images/main/office_cleaner.jpg';
import constructionHelper from '../src/images/main/construction.jpg';
import tankcleaner from '../src/images/main/cooking.jpg';
import otherservice from '../src/images/main/otherservices.jpg';
import cardriver from '../src/images/main/cardriver.jpg';

import feedback_01 from '../src/images/main/feedback/feedback_01.jpg'
import feedback_02 from '../src/images/main/feedback/feedback_02.jpg'
import feedback_03 from '../src/images/main/feedback/feedback_03.jpg'



function HomePageContent() {
	
	const location = useLocation();
	const navigate = useNavigate();  // Hook for navigation

	const [feedbacks, setFeedbacks] = useState([]);


	if (location.pathname === '/') {

		return (

			<div className="">

				<link href="https://fonts.googleapis.com/css?family=Poppins:200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
							rel="stylesheet" />

				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

				<link rel="stylesheet" href="/css/bootstrap.min.css" />		
				{/* <!-- Bootstrap CSS --> */}
				<link rel="stylesheet" href="css/bootstrap.min.css" />
				{/* <!-- Nice Select CSS --> */}
				<link rel="stylesheet" href="css/nice-select.css" />
				{/* <!-- Font Awesome CSS --> */}
				<link rel="stylesheet" href="css/font-awesome.min.css" />
				{/* <!-- icofont CSS --> */}
				<link rel="stylesheet" href="css/icofont.css" />
	

				{/* <!-- Preloader --> */}
				<div class="preloader">
					<div class="loader">
						<div class="loader-outter"></div>
						<div class="loader-inner"></div>

						{/* <div class="indicator"> 
							<svg width="16px" height="12px">
								<polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
								<polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
							</svg>
						</div> */}
					</div>
				</div>





									

				{/* <!-- Pricing Table --> */}
				<section class="pricing-table section">
						<div class="container">

							<div className="container-fluid" 
								style={{ 
									backgroundImage: "url('/img/slider6.jpg')", 
									backgroundRepeat: "no-repeat", 
									backgroundPosition: "center", 
									backgroundSize: "cover", 
									minHeight: "50vh", 
									width: "100%", 
									display: "flex", 
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									position: "relative",
									padding: "20px 30px"
								}}
							>
								{/* Dark Overlay for better text visibility */}
								<div   style={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									width: "100%",
									height: "100%", // Ensure it covers the full section
									backgroundImage: "url('/img/slider6.jpg')", // Ensure the correct path
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center",
									backgroundSize: "cover",
									backgroundColor: "rgba(193, 235, 240, 0.5)", // Light blue overlay
									backgroundBlendMode: "overlay",
									zIndex: "-1", // Ensure it stays behind other content
								}}
								></div>

								{/* Title Section */}
								<div className="row text-center" style={{ position: "relative", zIndex: 1 }}>
									<div className="col-lg-12">
										<h2 style={{ fontSize: "36px", fontWeight: "bold", color: "rgb(20, 20, 20)", marginBottom: "10px" }}>
											Hire Skilled Labor at Affordable Prices
										</h2>
										<p style={{ fontSize: "18px",color: "rgb(20, 20, 20)", maxWidth: "700px", margin: "0 auto" }}>
											We provide experienced and professional laborers for various services, ensuring quality and reliability.
										</p>
									</div>
								</div>

								{/* Service Blocks */}
								<div className="row text-center mt-4" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1200px" }}>
									
									{/* Block 1 */}
									<div className="col-lg-4 col-md-6 col-12">
										<div className="single-schedule" 
											style={{ backgroundColor: "#1a76d1", padding: "20px", borderRadius: "10px", margin: "10px", backdropFilter: "blur(10px)" }}>
											<div className="inner">
												<div className="single-content">
													<h4 style={{ fontSize: "22px", fontWeight: "bold", color: "#fff" }}>Immediate Required</h4>
													<p style={{ fontSize: "16px", color: "#f1f1f1" }}>
														Need workers right away? Get skilled labor on demand with instant hiring options.
													</p>
													<a href="https://stwebsuhas.z13.web.core.windows.net/about.html" style={{ fontSize: "16px", color: "#f1f1f1", fontWeight: "bold" }}>
														LEARN MORE <i className="fa fa-long-arrow-right"></i>
													</a>
												</div>
											</div>
										</div>
									</div>

									{/* Block 2 */}
									<div className="col-lg-4 col-md-6 col-12">
										<div className="single-schedule" 
											style={{ backgroundColor: "#1a76d1", padding: "20px", borderRadius: "10px", margin: "10px", backdropFilter: "blur(10px)" }}>
											<div className="inner">
												<div className="icon" style={{ fontSize: "40px", color: "#ffd700", marginBottom: "10px" }}>
													<i className="icofont-prescription"></i>
												</div>
												<div className="single-content">
													<h4 style={{ fontSize: "22px", fontWeight: "bold", color: "#fff" }}>After 1 Week</h4>
													<p style={{ fontSize: "16px", color: "#f1f1f1" }}>
														Plan ahead with our scheduled hiring service—get the right workforce exactly when you need them.
													</p>
													<a href="https://stwebsuhas.z13.web.core.windows.net/about.html" style={{ fontSize: "16px", color: "#f1f1f1", fontWeight: "bold" }}>
														LEARN MORE <i className="fa fa-long-arrow-right"></i>
													</a>
												</div>
											</div>
										</div>
									</div>

									{/* Block 3 */}
									<div className="col-lg-4 col-md-12 col-12">
										<div className="single-schedule" 
											style={{ backgroundColor: "#1a76d1", padding: "20px", borderRadius: "10px", margin: "10px", backdropFilter: "blur(10px)" }}>
											<div className="inner">
												<div className="icon" style={{ fontSize: "40px", color: "#ffd700", marginBottom: "10px" }}>
													<i className="icofont-prescription"></i>
												</div>
												<div className="single-content">
													<h4 style={{ fontSize: "22px", fontWeight: "bold", color: "#fff" }}>Advance Booking</h4>
													<p style={{ fontSize: "16px", color: "#f1f1f1" }}>
														Secure skilled labor in advance for your upcoming projects and ensure a hassle-free workflow.
													</p>
													<a href="https://stwebsuhas.z13.web.core.windows.net/about.html" style={{ fontSize: "16px", color: "#f1f1f1", fontWeight: "bold" }}>
														LEARN MORE <i className="fa fa-long-arrow-right"></i>
													</a>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>




							<div class="row">

																{/* <!-- Single Table --> */}
																<div class="col-lg-4 col-md-12 col-12">
									<div class="single-table">
										{/* <!-- Table Head --> */}
										<div class="table-head">
										<div className="icon">
											{/* Replace the icon with an image and use inline styles */}
											<img
												src={babycaretaker}
												alt="Baby Caretaker"
												style={{
												width: '175px', // Set the width of the image
												height: '175px', // Set the height of the image
												objectFit: 'cover', // Ensures the image fits within the defined dimensions
												borderRadius: '10px', // Add rounded corners (optional)
												}}
											/>
										</div>
											<h4 class="title">Baby Caretaker</h4>
											<h3 class="title">Starting Price @</h3>
											<div class="price">
												<p class="amount">299rs<span>/ Per Service</span></p>
											</div>	
										</div>
										{/* <!-- Table List --> */}
										<ul class="table-list">
											<li><i class="icofont icofont-ui-check"></i>Infant & Toddler Care</li>
											<li><i class="icofont icofont-ui-check"></i>Feeding & Meal Preparation</li>
											<li><i class="icofont icofont-ui-check"></i>Diaper Changing & Hygiene</li>
											<li class="cross"><i class="icofont icofont-ui-close"></i>Overnight Babysitting</li>
											<li class="cross"><i class="icofont icofont-ui-close"></i>Special Needs Childcare</li>
										</ul>							
										<div className="table-bottom">
											<a
												className="btn"
												href="/BabyCaretaker"
												style={{
												color: 'white', // Text color
												backgroundColor:  "#1a76d1", // Default background color
												textDecoration: 'none', // Remove underline
												padding: '10px 20px', // Padding around the button
												borderRadius: '5px', // Rounded corners
												display: 'inline-block', // Make it a block element
												transition: 'background-color 0.3s ease', // Smooth transition for hover
												}}
												onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')} 
												onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a76d1")} 	>
												Hire Now
											</a>
										</div>
										{/* <!-- Table Bottom --> */}
									</div>
								</div>
								{/* <!-- End Single Table--> */}

								
								{/* <!-- Single Table --> */}
								<div class="col-lg-4 col-md-12 col-12">
									<div class="single-table">
										{/* <!-- Table Head --> */}
										<div class="table-head">
										<div className="icon">
											{/* Replace the icon with an image and use inline styles */}
											<img
												src={cooking}
												alt="Cooking"
												style={{
												width: '175px', // Set the width of the image
												height: '175px', // Set the height of the image
												objectFit: 'cover', // Ensures the image fits within the defined dimensions
												borderRadius: '10px', // Add rounded corners (optional)
												}}
											/>
										</div>
											<h4 class="title">Cooking</h4>
											<h3 class="title">Starting Price @</h3>
											<div class="price">
												<p class="amount">150rs<span>/ Per Day</span></p>
											</div>	
										</div>
										{/* <!-- Table List --> */}
										<ul class="table-list">
											<ul class="table-list">
												<li><i class="icofont icofont-ui-check"></i>Professional Chefs</li>
												<li><i class="icofont icofont-ui-check"></i>Home Cooks</li>
												<li><i class="icofont icofont-ui-check"></i>Baking & Pastry Experts</li>
												<li><i class="icofont icofont-ui-check"></i>Catering Services</li>
												<li><i class="icofont icofont-ui-check"></i>Specialized Diet Meal Preparation</li>
											</ul>
											
										</ul>
										<div className="table-bottom">
											<a
												className="btn"
												href="/Cooking"
												style={{
												color: 'white', // Text color
												backgroundColor: "#1a76d1", // Default background color
												textDecoration: 'none', // Remove underline
												padding: '10px 20px', // Padding around the button
												borderRadius: '5px', // Rounded corners
												display: 'inline-block', // Make it a block element
												transition: 'background-color 0.3s ease', // Smooth transition for hover
												}}
												onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')} 
												onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a76d1")} 	>
												Hire Now
											</a>
										</div>
										{/* <!-- Table Bottom --> */}
									</div>
								</div>
								{/* <!-- End Single Table--> */}


								{/* <!-- Single Table --> */}
								<div class="col-lg-4 col-md-12 col-12">
									<div class="single-table">
										{/* <!-- Table Head --> */}
										<div class="table-head">
										<div className="icon">
											{/* Replace the icon with an image and use inline styles */}
											<img src={eldercaretaker}
												alt="Elder Caretaker"
												style={{
												width: '175px', // Set the width of the image
												height: '175px', // Set the height of the image
												objectFit: 'cover', // Ensures the image fits within the defined dimensions
												borderRadius: '10px', // Add rounded corners (optional)
												}} />
											</div>
											<h4 class="title">Elder Caretaker</h4>
											<h3 class="title">Starting Price @</h3>
											<div class="price">
												<p class="amount">250rs<span>/ Per Day</span></p>
											</div>	
										</div>
										{/* <!-- Table List --> */}
										<ul class="table-list">
											<li><i class="icofont icofont-ui-check"></i>Trained Elder Caregivers</li>
											<li><i class="icofont icofont-ui-check"></i>24/7 Home Care Services</li>
											<li class="cross"><i class="icofont icofont-ui-close"></i>Physical Therapy Assistants</li>
											<li class="cross"><i class="icofont icofont-ui-close"></i>Specialized Dementia Care</li>
											<li class="cross"><i class="icofont icofont-ui-close"></i>Certified Nursing Assistants</li>
										</ul>
										<div className="table-bottom">
											<a
												className="btn"
												href="/ElderCare"
												style={{
												color: 'white', // Text color
												backgroundColor:  "#1a76d1", // Default background color
												textDecoration: 'none', // Remove underline
												padding: '10px 20px', // Padding around the button
												borderRadius: '5px', // Rounded corners
												display: 'inline-block', // Make it a block element
												transition: 'background-color 0.3s ease', // Smooth transition for hover
												}}
												onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')} 
												onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a76d1")} 	>
												Hire Now
											</a>
										</div>
										{/* <!-- Table Bottom --> */}
									</div>
								</div>
								{/* <!-- End Single Table--> */}




								{/* <!-- Single Table --> */}
								<div class="col-lg-4 col-md-12 col-12">
									<div class="single-table">
										{/* <!-- Table Head --> */}
										<div class="table-head">
										<div className="icon">
											{/* Replace the icon with an image and use inline styles */}
											<img
												src={cleaner}
												alt="House keeping"
												style={{
												width: '175px', // Set the width of the image
												height: '175px', // Set the height of the image
												objectFit: 'cover', // Ensures the image fits within the defined dimensions
												borderRadius: '10px', // Add rounded corners (optional)
												}}
											/>
										</div>
											<h4 class="title">Housekeeping</h4>
											<h3 class="title">Starting Price @</h3>
											<div class="price">
												<p class="amount">299rs<span>/ Per Service</span></p>
											</div>	
										</div>
										{/* <!-- Table List --> */}
										<ul class="table-list">
											<li><i class="icofont icofont-ui-check"></i>Residential & Commercial Cleaning</li>
											<li><i class="icofont icofont-ui-check"></i>Laundry & Ironing Services</li>
											<li><i class="icofont icofont-ui-check"></i>Deep Cleaning & Sanitization</li>
											<li class="cross"><i class="icofont icofont-ui-close"></i>Event Cleanup</li>
											<li class="cross"><i class="icofont icofont-ui-close"></i>Pest Control Services</li>
										</ul>
										<div className="table-bottom">
											<a className="btn"
												href="/Cleaning"
												style={{
												color: 'white', // Text color
												backgroundColor: "#1a76d1", // Default background color
												textDecoration: 'none', // Remove underline
												padding: '10px 20px', // Padding around the button
												borderRadius: '5px', // Rounded corners
												display: 'inline-block', // Make it a block element
												transition: 'background-color 0.3s ease', // Smooth transition for hover
												}}
												onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')} 
												onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a76d1")} 	>
												Hire Now
											</a>
										</div>
										{/* <!-- Table Bottom --> */}
									</div>
								</div>
								{/* <!-- End Single Table--> */}
								

								{/* <!-- Single Table --> */}
								<div class="col-lg-4 col-md-12 col-12">
									<div class="single-table">
										{/* <!-- Table Head --> */}
										<div class="table-head">
										<div className="icon">
											{/* Replace the icon with an image and use inline styles */}
											<img
												src={cleaner}
												alt="House keeping"
												style={{
												width: '175px', // Set the width of the image
												height: '175px', // Set the height of the image
												objectFit: 'cover', // Ensures the image fits within the defined dimensions
												borderRadius: '10px', // Add rounded corners (optional)
												}}
											/>
										</div>
											<h4 class="title">Helper</h4>
											<h3 class="title">Starting Price @</h3>
											<div class="price">
												<p class="amount">199rs<span>/ Per Service</span></p>
											</div>	
										</div>
										{/* <!-- Table List --> */}
										<ul class="table-list">
											<li><i class="icofont icofont-ui-check"></i>Packers & Movers</li>
											<li><i class="icofont icofont-ui-check"></i>Warehouse & Inventory Staff</li>
											<li><i class="icofont icofont-ui-check"></i>Loading & Unloading Labor</li>
											<li><i class="icofont icofont-ui-check"></i>Furniture Assembly</li>
											<li><i class="icofont icofont-ui-check"></i>Long-Distance Relocation</li>
										</ul>
										<div className="table-bottom">
											<a
												className="btn"
												href="/Helper"
												style={{
												color: 'white', // Text color
												backgroundColor: "#1a76d1", // Default background color
												textDecoration: 'none', // Remove underline
												padding: '10px 20px', // Padding around the button
												borderRadius: '5px', // Rounded corners
												display: 'inline-block', // Make it a block element
												transition: 'background-color 0.3s ease', // Smooth transition for hover
												}}
												onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')} 
												onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a76d1")} 	>
												Hire Now
											</a>
										</div>
										{/* <!-- Table Bottom --> */}
									</div>
								</div>
								{/* <!-- End Single Table--> */}

								{/* <!-- Single Table --> */}
								<div class="col-lg-4 col-md-12 col-12">
									<div class="single-table">
										{/* <!-- Table Head --> */}
										<div class="table-head">
										<div className="icon">
											{/* Replace the icon with an image and use inline styles */}
											<img
												src={otherservice}
												alt="Other Services"
												style={{
												width: '175px', // Set the width of the image
												height: '175px', // Set the height of the image
												objectFit: 'cover', // Ensures the image fits within the defined dimensions
												borderRadius: '10px', // Add rounded corners (optional)
												}}
											/>
										</div>
											<h4 class="title">Other Services</h4>
											<h3 class="title">Starting Price @</h3>
											<div class="price">
												<p class="amount">99rs<span>/ Per Service</span></p>
											</div>	
										</div>
										{/* <!-- Table List --> */}
										<ul class="table-list">
											<li><i class="icofont icofont-ui-check"></i>Packers & Movers</li>
											<li><i class="icofont icofont-ui-check"></i>Warehouse & Inventory Staff</li>
											<li><i class="icofont icofont-ui-check"></i>Loading & Unloading Labor</li>
											<li><i class="icofont icofont-ui-check"></i>Furniture Assembly</li>
											<li><i class="icofont icofont-ui-check"></i>Long-Distance Relocation</li>
										</ul>
										<div className="table-bottom">
											<a
												className="btn"
												href="/OtherServices"
												style={{
												color: 'white', // Text color
												backgroundColor: "#1a76d1", // Default background color
												textDecoration: 'none', // Remove underline
												padding: '10px 20px', // Padding around the button
												borderRadius: '5px', // Rounded corners
												display: 'inline-block', // Make it a block element
												transition: 'background-color 0.3s ease', // Smooth transition for hover
												}}
												onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')} 
												onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a76d1")} 	>
												Hire Now
											</a>
										</div>
										{/* <!-- Table Bottom --> */}
									</div>
								</div>
								{/* <!-- End Single Table--> */}
							</div>	
						</div>	
					</section>	
					{/* <!--/ End Pricing Table --> */}



				{/* <!-- jquery Min JS --> */}
				<script src="/js/jquery.min.js"></script>
				{/* <!-- jquery Migrate JS --> */}
				<script src="/js/jquery-migrate-3.0.0.js"></script>
				{/* <!-- jquery Ui JS --> */}
				<script src="/js/jquery-ui.min.js"></script>
				{/* <!-- Easing JS --> */}
				<script src="/js/easing.js"></script>
				{/* <!-- Color JS --> */}
				<script src="/js/colors.js"></script>
				{/* <!-- Popper JS --> */}
				<script src="/js/popper.min.js"></script>
				{/* <!-- Bootstrap Datepicker JS --> */}
				<script src="/js/bootstrap-datepicker.js"></script>
				{/* <!-- Jquery Nav JS --> */}
				<script src="/js/jquery.nav.js"></script>
				{/* <!-- Slicknav JS --> */}
				<script src="/js/slicknav.min.js"></script>
				{/* <!-- ScrollUp JS --> */}
				<script src="/js/jquery.scrollUp.min.js"></script>
				{/* <!-- Niceselect JS --> */}
				<script src="/js/niceselect.js"></script>
				{/* <!-- Tilt Jquery JS --> */}
				<script src="/js/tilt.jquery.min.js"></script>
				{/* <!-- Owl Carousel JS --> */}
				<script src="/js/owl-carousel.js"></script>
				{/* <!-- counterup JS --> */}
				<script src="/js/jquery.counterup.min.js"></script>
				{/* <!-- Steller JS --> */}
				<script src="/js/steller.js"></script>
				{/* <!-- Wow JS --> */}
				<script src="/js/wow.min.js"></script>
				{/* <!-- Magnific Popup JS --> */}
				<script src="/js/jquery.magnific-popup.min.js"></script>
				{/* <!-- Counter Up CDN JS --> */}
				<script src="http://cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.3/waypoints.min.js"></script>
				{/* <!-- Bootstrap JS --> */}
				<script src="/js/bootstrap.min.js"></script>
				{/* <!-- Main JS --> */}
				<script src="/js/main.js"></script>

			</div>

		);
	}
	return null;
}

function App() {

	return (
		<Router>
			<div>

				{/* ------------------------------------------------------- Header Concept Removed */}
				{ <Header />}

				{/* ------------------------------------------------------- Homepage */}
				<HomePageContent />
				<Routes>

					{/* <Route path="/" element={<h2>Home Content</h2>} /> */}
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/about_us" element={<AboutUs />} />
					<Route path="/contact_us" element={<ContactUs />} />
					<Route path="/LabourPage" element={<LabourPage />} />
					<Route path="/LegalInformation" element={<LegalInformation />} />
					<Route path="/LabourLogin" element={<LabourLogin />} />
					<Route path="/LabourSignup" element={<LabourSignup />} />
					<Route path="/LabourDashboard" element={<LabourDashboard />} />
					<Route path="/userpage" element={<Userpage />} />
					
					<Route path="/UserLogin" element={<UserLogin />} />
					<Route path="/UserSignup" element={<UserSignup />} />

					<Route path="/UserDashboard" element={<UserDashboard />} />
					<Route path="/AgentLogin" element={<AgentLogin />} />
					<Route path="/AgentSignup" element={<AgentSignup />} />
					<Route path="/AgentDashboard" element={<AgentDashboard />} />
					<Route path="/CbLogin" element={<CbLogin />} />
					<Route path="/CbSignup" element={<CbSignup />} />

					<Route path="/OtherServices" element={<OtherServices />} />
					<Route path="/babyCaretaker" element={<BabyCaretaker />} />
					<Route path="/ElderCare" element={<ElderCare />} />
					<Route path="/Cooking" element={<Cooking />} />
					<Route path="/Cleaning" element={<Cleaning />} />
					<Route path="/Helper" element={<Helper />} />
					<Route path="/AcRepair" element={<AcRepair />} />
					<Route path="/ElectricalService" element={<ElectricalService />} />
					<Route path="/PlumberService" element={<PlumberService />} />

					<Route path="/TankCleaner" element={<TankCleaner />} />
					<Route path="/DrinkingWater" element={<DrinkingWater />} />
					<Route path="/VehicleInsuranceAgent" element={<VehicleInsuranceAgent />} />
					<Route path="/LifeInsuranceAgent" element={<LifeInsuranceAgent />} />
					<Route path="/Gardening" element={<Gardening />} />
					<Route path="/CarDriver" element={<CarDriver />} />					
					<Route path="/Cleaning" element={<TankCleaner />} />
					<Route path="/PackersMovers" element={<PackersMovers />} />

					<Route path="/AgentRegistrationPage" element={<AgentRegistrationPage />} />
					<Route path="/SleepingPartnerPage" element={<SleepingPartnerPage />} />

					<Route path="/emp_babyCaretaker" element={<EmpBabyCaretaker />} />
					<Route path="/emp_ElderCare" element={<EmpElderCare/>} />
					<Route path="/emp_Cooking" element={<EmpCooking />} />
					<Route path="/emp_housekeeping" element={<EmpCleaning />} />
					<Route path="/emp_TankCleaner" element={<EmpTankcleaner/>} />
					<Route path="/empDriver" element={<EmpDriver />} />
					<Route path="/emp_logistics" element={<EmpLogistics />} />
					<Route path="/emp_Otherservices" element={<EmpOtherservice />} />
					<Route path="/emp_helper" element={<EmpHelper />} />

					<Route path="/labour-list" element={<LabourList />} />
					<Route path="/subscription" element={<Subscription />} />
					<Route path="/underMaintenance" element={<UnderMaintenance />} />
					

					{/* <Route path="/payment" element={<Payment />} /> */}
				</Routes>


				{/* ------------------------------------------------------- Footer Concept*/}
				<Footer />

				{/* ------------------------------------------------------- Chatbot COncept */}
				<Chatbot /> 
				{/* <Subscription />  */}

			</div>
		</Router>
	);
}

export default App;




// -------------------------------------------------------------------- Version Original - bfr implemented to 


// 	{/* ----------------------------------------------------------- Finding a worker */}
// 	<div className="container-findworker">
// 	<div className="content-container">
// 		<h1>Find a Worker</h1>
// 	</div>
// 	<div className="image-grid">
// 		{/* Baby Caretaker */}
// 		<div className="image-container">
// 			<button onClick={() => navigate('/babyCaretaker')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={babycaretaker} alt="Worker Image" />
// 				<p>Baby Caretaker</p>
// 			</button>
// 		</div>
		
// 		{/* Elderly Care */}
// 		<div className="image-container">
// 			<button onClick={() => navigate('/ElderCare')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={eldercaretaker} alt="Worker Image" />
// 				<p>Elderly Care</p>
// 			</button>
// 		</div>
		
// 		{/* Cleaning */}
// 		<div className="image-container">
// 			<button onClick={() => navigate('/Cleaning')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={cleaner} alt="Worker Image" />
// 				<p>Cleaning</p>
// 			</button>
// 		</div>
		
// 		{/* Cooking */}
// 		<div className="image-container">
// 			<button onClick={() => navigate('/Cooking')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={cooking} alt="Worker Image" />
// 				<p>Cooking</p>
// 			</button>
// 		</div>

// 		{/* Other Services */}
// 		<div className="image-container">
// 			<button onClick={() => navigate('/OtherServices')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={otherservice} alt="Worker Image" />
// 				<p>Other Service's</p>
// 			</button>
// 		</div>
// 	</div>
// </div>


// {/* ---------------------------------------------------------- For Looking a Job */}
// <div>
// 	<div className="find-worker-container">
// 			{/* <h1 className="main-header">Find the Woker</h1> */}
// 			<div className="worker-grid">
// 			</div>
// 		</div>
// 	</div>

// <div className="container-findworker">
// 	<div className="content-container">
// 		<h1>Need a Job</h1>
// 	</div>
// 	<div className="image-grid">
// 		<div className="image-container">
// 			<button onClick={() => navigate('/emp_babyCaretaker')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={babycaretaker} alt="Worker Image" />
// 				<p>Baby Caretaker</p>
// 			</button>
// 		</div>
// 		<div className="image-container">
// 			<button onClick={() => navigate('/emp_ElderCare')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={eldercaretaker} alt="Worker Image" />
// 				<p>Elderly Care</p>
// 			</button>
// 		</div>
// 		<div className="image-container">
// 			<button onClick={() => navigate('/emp_Cleaning')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={cleaner} alt="Worker Image" />
// 				<p>Cleaning</p>
// 			</button>
// 		</div>
// 		<div className="image-container">
// 			<button onClick={() => navigate('/emp_Cooking')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={cooking} alt="Worker Image" />
// 				<p>Cooking</p>
// 			</button>
// 		</div>

// 		{/* Other Services */}
// 		<div className="image-container">
// 			<button onClick={() => navigate('/emp_Otherservices')} style={{ border: 'none', background: 'none', padding: '0', cursor: 'pointer' }}>
// 				<img src={otherservice} alt="Worker Image" />
// 				<p>Other Service's</p>
// 			</button>
// 		</div>
// 	</div>
// </div>
// <br></br>


// {/* -------------------------------------------------------------------------------- */}
// {/* Image Carousel row 3 */}
// <div className="carousel-container">
// 	<div className="carousel">
// 		<div className="carousel-item">
// 			<img src={industryHelper} alt="industryHelper" />
// 			<p>Industry Helper</p>
// 			<div className="extra-content">
// 				<p>Experienced in various industrial tasks.</p>
// 				<button onClick={() => navigate('/about_us#industryHelper')}>Learn More</button>
// 			</div>
// 		</div>
// 		<div className="carousel-item">
// 			<img src={officeCleaner} alt="officeCleaner" />
// 			<p>Office Cleaner</p>
// 			<div className="extra-content">
// 				<p>Specializes in residential and commercial cleaning.</p>
// 				<button onClick={() => navigate('/about_us#officeCleaner')}>Learn More</button>
// 			</div>
// 		</div>
		
// 		<div className="carousel-item">
// 			<img src={constructionHelper} alt="constructionHelper" />
// 			<p>Construction Helper</p>
// 			<div className="extra-content">
// 				<p>Trained in eco-friendly cleaning methods.</p>
// 				<button onClick={() => navigate('/about_us#constructionHelper')}>Learn More</button>
// 			</div>
// 		</div>
// 	</div>
// </div>  


// {/* ---------------------------------------- ---------------------------Image Carousel row 2*/}
// <div className="carousel-container-2">
// 	<div className="carousel">
// 		<div className="carousel-item">
// 			<img src={acRepair} alt="acRepair" />
// 			<p>AC Reapir</p>
// 			<div className="extra-content">
// 				<p>Trained in eco-friendly AC repair and cleaning methods.</p>
// 				<button onClick={() => navigate('/about_us#acRepair')}>Learn More</button>
// 			</div>
// 		</div>
// 		<div className="carousel-item">
// 			<img src={painter} alt="painter" />
// 			<p>Painter</p>
// 			<div className="extra-content">
// 				<p>Trained in eco-friendly Painter and Finish with effective quality</p>
// 				<button onClick={() => navigate('/about_us#painter')}>Learn More</button>
// 			</div>
// 		</div>
// 		<div className="carousel-item">
// 			<img src={gardening} alt="gardening" />
// 			<p>Gardening</p>
// 			<div className="extra-content">
// 				<p>Trained in eco-friendly Gardner who grow the plant and maintain the plants </p>
// 				<button onClick={() => navigate('/about_us#gardening')}>Learn More</button>
// 			</div>
// 		</div>
// 	</div>
// </div>

// {/* -------------------------------------------------  -Customer Feedback Carousel */}
// <div className="carousel-container-2" style={{ textAlign: "center" }}>
// 	<h2>Recent Customer Feedback</h2>
// 	<div className="carousel" style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
// 		<div className="carousel-item" style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "200px" }}>
// 			<img 
// 				src={acRepair} 
// 				alt="John Doe" 
// 				style={{ width: "150px", height: "150px", margin: "0 auto", display: "block" }} 
// 			/>
// 			<h3 style={{ margin: "10px 0" }}>John Doe</h3>
// 			<p style={{ margin: "5px 0" }}>Rating: 9/10</p>
// 			<p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐⭐</p>
// 			<p>Excellent service and prompt delivery!</p>
// 		</div>
// 		<div className="carousel-item" style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "200px" }}>
// 			<img 
// 				src={acRepair} 
// 				alt="Jane Smith" 
// 				style={{ width: "150px", height: "150px", margin: "0 auto", display: "block" }} 
// 			/>
// 			<h3 style={{ margin: "10px 0" }}>Jane Smith</h3>
// 			<p style={{ margin: "5px 0" }}>Rating: 8/10</p>
// 			<p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐</p>
// 			<p>Very satisfied with the product quality.</p>
// 		</div>
// 		<div className="carousel-item" style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "200px" }}>
// 			<img 
// 				src={acRepair} 
// 				alt="Michael Brown" 
// 				style={{ width: "150px", height: "150px", margin: "0 auto", display: "block" }} 
// 			/>
// 			<h3 style={{ margin: "10px 0" }}>Michael Brown</h3>
// 			<p style={{ margin: "5px 0" }}>Rating: 10/10</p>
// 			<p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐⭐⭐</p>
// 			<p>Outstanding experience! Highly recommended.</p>
// 		</div>
// 	</div>
// </div>


// {/* ---------------------------------------------------------------- Labour Feedback Carousel */}

// {/* Customer Feedback Carousel */}
// <div className="feedback-carousel" style={{ textAlign: "center" }}>
// 	<h2>Recent Labour Feedback</h2>
// 	<div className="carousel-feedback" style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
// 		<div className="carousel-item" style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "200px" }}>
// 			<img 
// 				src={feedback_01} 
// 				alt="Shreya Shree" 
// 				style={{ width: "150px", height: "150px", margin: "0 auto", display: "block" }} 
// 			/>
// 			<h3 style={{ margin: "10px 0" }}>Shreya Shree</h3>
// 			<p style={{ margin: "5px 0" }}>Rating: 9/10</p>
// 			<p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐⭐</p>
// 			<p>Excellent service and prompt delivery!</p>
// 		</div>
// 		<div className="carousel-item" style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "200px" }}>
// 			<img 
// 				src={feedback_02} 
// 				alt="Vedha Shree" 
// 				style={{ width: "150px", height: "150px", margin: "0 auto", display: "block" }} 
// 			/>
// 			<h3 style={{ margin: "10px 0" }}>Vedha Shree</h3>
// 			<p style={{ margin: "5px 0" }}>Rating: 8/10</p>
// 			<p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐</p>
// 			<p>Very satisfied with the product quality.</p>
// 		</div>
// 		<div className="carousel-item" style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "200px" }}>
// 			<img 
// 				src={feedback_03} 
// 				alt="Jannu" 
// 				style={{ width: "150px", height: "150px", margin: "0 auto", display: "block" }} 
// 			/>
// 			<h3 style={{ margin: "10px 0" }}>Jannu</h3>
// 			<p style={{ margin: "5px 0" }}>Rating: 10/10</p>
// 			<p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐⭐⭐</p>
// 			<p>Outstanding experience! Highly recommended.</p>
// 		</div>

// 		<div className="carousel-item" style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "200px" }}>
// 			<img 
// 				src={feedback_03} 
// 				alt="Jannu" 
// 				style={{ width: "150px", height: "150px", margin: "0 auto", display: "block" }} 
// 			/>
// 			<h3 style={{ margin: "10px 0" }}>Jannu</h3>
// 			<p style={{ margin: "5px 0" }}>Rating: 10/10</p>
// 			<p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐⭐⭐</p>
// 			<p>Outstanding experience! Highly recommended.</p>
// 		</div>
// 		<div className="carousel-item" style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "8px", maxWidth: "200px" }}>
// 			<img 
// 				src={feedback_03} 
// 				alt="Jannu" 
// 				style={{ width: "150px", height: "150px", margin: "0 auto", display: "block" }} 
// 			/>
// 			<h3 style={{ margin: "10px 0" }}>Jannu</h3>
// 			<p style={{ margin: "5px 0" }}>Rating: 10/10</p>
// 			<p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐⭐⭐</p>
// 			<p>Outstanding experience! Highly recommended.</p>
// 		</div>

// 	</div>
// </div>
// </div>