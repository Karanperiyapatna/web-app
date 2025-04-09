import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGooglePlus, FaVimeo, FaPinterest, FaCaretRight } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
	const socialLinks = [
		{ icon: <FaFacebook />, link: "#" },
		{ icon: <FaGooglePlus />, link: "#" },
		{ icon: <FaTwitter />, link: "#" },
		{ icon: <FaVimeo />, link: "#" },
		{ icon: <FaPinterest />, link: "#" }
	];

	const quickLinks = [
		{ name: "Home", link: "/" },
		{ name: "Services", link: "/services" },
		{ name: "About Us",  href: "https://stwebsuhas.z13.web.core.windows.net/about.html"  },
		{ name: "Contact Us", link: "/contact_us" },
		{ name: "Pricing", link: "/" },
		{ name: "Labour Page", link: "/labour" },
		{ name: "Agent Page", link: "/AgentLogin" },
		{ name: "Demand Page", link: "/demand" },
		{ name: "FAQ", link: "/faq" }
	];

	return (

		<footer className="bg-primary text-white pt-4">			
			<div className="container">
				<div className="row">
					{/* About Us Section */}
					<div className="col-lg-4 col-md-7">
						<h4 class="text-white fs-4">About Us</h4>  {/* Bigger Heading */}
						<p className="fs-7 text-white">
							We connect skilled laborers with businesses and individuals looking for reliable workforce solutions.
							From construction to home services, we provide trusted professionals for your needs.
						</p>
						<ul className="list-inline">
							{socialLinks.map((item, index) => (
								<li key={index} className="list-inline-item mx-2">
									<a href={item.link} className="text-white" style={{ fontSize: "20px" }}>
										{item.icon}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Quick Links */}
					<div className="col-lg-4 col-md-7">
						<h4 class="text-white fs-4">Quick Links</h4> {/* Bigger Heading fs-3 */}
						<div className="row">
							{Array(2).fill().map((_, colIndex) => (
								<div key={colIndex} className="col-6">
								<ul className="list-unstyled">
									{quickLinks
									.filter((_, index) => index % 2 === colIndex)
									.map((item, index) => (
										<li key={index}>
										<a
											href={item.href || item.link}
											className="text-white d-block fs-7"
											target={item.href ? "_blank" : "_self"}
											rel={item.href ? "noopener noreferrer" : undefined}
										>
											<FaCaretRight /> {item.name}
										</a>
										</li>
									))}
								</ul>
								</div>
							))}
							</div>

					</div>

					{/* Working Hours */}
					<div className="col-lg-4 col-md-7">
						<h4 class="text-white fs-4">Working Hours</h4>
						<ul className="list-unstyled  text-white fs-7"> {/* Smaller Text */}
							<li>Monday - Friday: <span>10:00 AM - 5:00 PM</span></li>
							<li>Saturday: <span>10:00 AM - 1:30 PM</span></li>
						</ul>
					</div>
				</div>

			</div >


				
			{/* Copyright Row */}
			<div class="col-lg-12 col-md-12 col-12 text-center">
				<div class="copyright-content">
					{/* increase the size - higher value - small size */}
					<p class="fs-7"> 
					© Copyright 2025 | All Rights Reserved by
					<a href="https://www.wpthemesgrid.com" target="_blank">digilaboursolution.com</a>
					</p>
				</div>
			</div>


		
		</footer>
	);
}

export default Footer;
