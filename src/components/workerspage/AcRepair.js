import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ACrepair.css";

const AcRepair = () => {
	const [searchCriteria, setSearchCriteria] = useState({
		gender: "",
		careLocation: "",
		area: "",
	});

	const navigate = useNavigate();

	const areaOptions = {
		mysore: ["JP Nagar", "Kuvempunagr"],
		bangalore: ["Banashankari", "Vijayanagar"],
		chennai: ["Aramadai"]
	};

	const handleFormChangeCheckLabour = (e) => {
		const { name, value } = e.target;
		setSearchCriteria((prev) => ({ ...prev, [name]: value }));
	};

	const handleSearchCheckLabour = async (e) => {
		e.preventDefault();

		const { gender, careLocation, area } = searchCriteria;
		if (!gender || !careLocation || !area) {
			alert("Please fill all fields before searching");
			return;
		}

		try {
			const requestBody = {
				...searchCriteria,
				service_category: "ac-repair",
			};

			const response = await fetch(
				`${process.env.API_BASE_URL}/api/search/labour-otherservice/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody),
			});

			const data = await response.json();
			if (response.ok) {
				console.log("Search Results:", data);
				navigate("/labour-list", { state: { labours: data.labours, service_category: "AC Repair" } });
			} else {
				console.error("Error:", data.error);
			}
		} catch (error) {
			console.error("Request failed:", error);
		}
	};

	return (
		<div>
			<h2>AC Repair Labour Services Details</h2>
			<form className="requirement-form" onSubmit={handleSearchCheckLabour}>
				<h2>Check Labour</h2>
				<label>
					Gender:
					<select name="gender" value={searchCriteria.gender} onChange={handleFormChangeCheckLabour} required>
						<option value="">Select</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</label>
				<label>
					City:
					<select name="careLocation" value={searchCriteria.careLocation} onChange={handleFormChangeCheckLabour} required>
						<option value="">Select City</option>
						<option value="mysore">Mysore</option>
						<option value="bangalore">Bangalore</option>
						<option value="chennai">Chennai</option>
					</select>
				</label>
				<label>
					Working Area:
					<select name="area" value={searchCriteria.area} onChange={handleFormChangeCheckLabour} required>
						<option value="">Select Area</option>
						{searchCriteria.careLocation &&
							areaOptions[searchCriteria.careLocation.toLowerCase()].map((area) => (
								<option key={area} value={area}>{area}</option>
							))
						}
					</select>
				</label>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default AcRepair;
