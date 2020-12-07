import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsChevronCompactUp } from "react-icons/bs";
import { IoIosPower } from "react-icons/io";
import Cookies from "js-cookie";

import "./SideNavbar.css";
import { Link, useHistory } from "react-router-dom";

const SideNavbar = (props) => {
	const [temp, setTemp] = useState("No information");
	const key = "P9T8F7R1A1P";
	const history = useHistory();

	const onClose = (e) => {
		props.onClose && props.onClose(e);
	};

	useEffect(() => {
		const fetchData = async () => {
			const resultTemp = await axios(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/temp/" + key
			);
			setTemp(resultTemp.data.temp.toFixed(2) + " ℃");
		};
		const interval = setInterval(() => {
			fetchData();
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	if (!props.show) {
		return null;
	}

	const handleLogout = () => {
		Cookies.remove("user", { path: "" });
		history.replace("/login");
	};

	return (
		<div className='sidenav'>
			<Link to='/myPets'>My Pets</Link>
			<Link to='/dailyReport'>Daily Report</Link>

			<button
				style={{
					width: "40px",
					height: "40px",
					marginRight: "20px",
					outline: "none",
					backgroundColor: "#262626",
					border: "none",
					color: "white",
					cursor: "pointer",
				}}
				onClick={handleLogout}
			>
				<IoIosPower size='35px' />
			</button>
			<div className='sideTemp'>
				Temperature:{" "}
				<div style={{ fontWeight: "bold", paddingTop: "2%" }}>{temp}</div>
			</div>
			<button className='sideCloseBtn' onClick={onClose}>
				<BsChevronCompactUp size='20px' />
			</button>
		</div>
	);
};

export default SideNavbar;
