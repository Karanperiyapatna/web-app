import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import React, { useState} from 'react';

// import './../styles/main.css';
import '../styles/OtherServices.css'


import babycaretaker from  '../images/main/babycaretaker.jpg';
import eldercaretaker from '../images/main/eldercaretaker.jpg';
import cleaner from '../images/main/cleaner.jpg';
import cooking from '../images/main/cooking.jpg';
import electrical from '../images/main/electrical.jpg'
import pumbler from '../images/main/plumber.jpg'
import cardriver from '../images/main/cardriver.jpg'
import lifeinsurance from '../images/main/lifeinsurance.jpg'
import vehicleinsurance from '../images/main/vehicleinsurance.jpg'
import acrepair from '../images/main/acrepair.jpg';
import painter from '../images/main/painter.jpg';
import constructionHelper from '../images/main/construction.jpg';
import tankcleaner from '../images/main/tankcleaner.jpg';
import watersupplier from '../images/main/watersupplier.jpg'
import helper from '../images/main/helper.jpg'
import  gardening from '../images/main/gardening.jpg'




const OtherServices = () => {

	return (
				<div className="container-services-otherservice">
					<div className="content-container-otherservice">
						<h1>Find a Worker</h1>
					</div>
					<div className="image-grid">

						{/* RO Drinking Water Supplier */}
						<div className="image-container">
							<a href="/ACrepair" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={acrepair} alt="Worker Image" />
								<p>AC Repair</p>
							</a>
						</div>

						{/* Car Driver's */}
						<div className="image-container">
							<a href="/CarDriver" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={cardriver} alt="Worker Image" />
								<p>Car Driver's</p>
							</a>
						</div>

						{/* Baby Caretaker */}
						<div className="image-container">
							<a href="/BabyCaretaker" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={babycaretaker} alt="Worker Image" />
								<p>Baby Caretaker</p>
							</a>
						</div>

						
						{/* Elderly Care */}
						<div className="image-container">
							<a href="/ElderCare" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={eldercaretaker} alt="Worker Image" />
								<p>Elder Caretaker</p>
							</a>
						</div>
						
						{/* Cleaning */}
						<div className="image-container">
							<a href="/Cleaning" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={cleaner} alt="Worker Image" />
								<p>Cleaning</p>
							</a>
						</div>

						
						{/* Cooking */}
						<div className="image-container">
							<a href="/Cooking" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={cooking} alt="Worker Image" />
								<p>Cooking</p>
							</a>
						</div>

						{/* RO Drinking Water Supplier */}
						<div className="image-container">
							<a href="/DrinkingWater" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={watersupplier} alt="Worker Image" />
								<p>Drinking Water Supplier</p>
							</a>
						</div>

						{/* Electrical Woker */}
						<div className="image-container">
							<a href="/ElectricalService" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={electrical} alt="Worker Image" />
								<p>Electrical Woker</p>
							</a>
						</div>

						{/* Pumbler Woker */}
						<div className="image-container">
							<a href="/Helper" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={helper} alt="Worker Image" />
								<p>Helper</p>
							</a>
						</div>

						{/* Car Driver's */}
						<div className="image-container">
							<a href="/Gardening" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={gardening} alt="Worker Image" />
								<p>Gardening</p>
							</a>
						</div>


						{/* Life Insurance Agent */}
						<div className="image-container">
							<a href="/LifeInsuranceAgent" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={lifeinsurance} alt="Worker Image" />
								<p>Life Insurance Agent</p>
							</a>
						</div>

						{/* Life Insurance Agent */}
						<div className="image-container">
							<a href="/PackersMovers" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={lifeinsurance} alt="Worker Image" />
								<p>Packer's and Movers</p>
							</a>
						</div>

						{/* Pumbler Woker */}
						<div className="image-container">
							<a href="/PlumberService" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={pumbler} alt="Worker Image" />
								<p>Pumbler Woker</p>
							</a>
						</div>

						{/* Tank Cleaner */}
						<div className="image-container">
							<a href="/TankCleaner" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={tankcleaner} alt="Worker Image" />
								<p>Tank Cleaner</p>
							</a>
						</div>

						{/* Vehicel Insurance Agent */}
						<div className="image-container">
							<a href="/VehicleInsuranceAgent" style={{ textDecoration: 'none', color: 'inherit' }}>
								<img src={vehicleinsurance} alt="Worker Image" />
								<p>vehicle Insurance Agent</p>
							</a>
						</div>

					</div>
				</div>
	);
};

export default OtherServices;
