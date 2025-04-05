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
        { name: "Home", link: "/home" },
        { name: "Services", link: "/services" },
        { name: "About Us", link: "/about" },
        { name: "Contact Us", link: "/contact" },
        { name: "Pricing", link: "/pricing" },
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
                    <div className="col-lg-4 col-md-6">
                        <h4>About Us</h4>
                        <p>
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
                    <div className="col-lg-4 col-md-6">
                        <h4>Quick Links</h4>
                        <div className="row">
                            {Array(2).fill().map((_, colIndex) => (
                                <div key={colIndex} className="col-6">
                                    <ul className="list-unstyled">
                                        {quickLinks
                                            .filter((_, index) => index % 2 === colIndex)
                                            .map((item, index) => (
                                                <li key={index}>
                                                    <a href={item.link} className="text-white d-block">
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
                    <div className="col-lg-4 col-md-12">
                        <h4>Working Hours</h4>
                        <ul className="list-unstyled">
                            <li>Monday - Friday: <span>10:00 AM - 5:00 PM</span></li>
                            <li>Saturday: <span>10:00 AM - 1:30 PM</span></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Row */}
                <div className="text-center mt-4 py-3 bg-dark">
                    <p className="mb-0 text-white">© 2025 | All Rights Reserved by <a href="https://digilaboursolution.com" className="text-white">digilaboursolution.com</a></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
