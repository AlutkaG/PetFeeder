import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { IoIosPower, IoIosMenu } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";

import Aux from "../../hoc/Aux";

import "./Navbar.css";

const Navbar = (props) => {
	const [red, setRed] = useState(0);
	const [blue, setBlue] = useState(0);
	const [temp, setTemp] = useState("No information");
	const usr = Cookies.get("user");
	const history = useHistory();
	const key = "P9T8F7R1A1P";
	useEffect(() => {
		const fetchData = async () => {
			const resultRed = await axios(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/red/" +
					usr +
					"/" +
					key
			);
			setRed(resultRed.data.red);
			const resultBlue = await axios(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/blue/" +
					usr +
					"/" +
					key
			);
			setBlue(resultBlue.data.blue);
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

	const handleLogout = () => {
		Cookies.remove("user", { path: "" });
		history.replace("/login");
	};

	const handleOpen = () => {
		props.openClickHandler();
	};

	return (
		<Aux>
			<div className='topNav'>
				<div className='topNavNavi'>
					<button className='icon-menu' onClick={(e) => handleOpen()}>
						<IoIosMenu size='50px' color='white' />
					</button>
					<div>
						<Link to='/home' className='appName'>
							Pets Feeder
						</Link>
					</div>
					<div className='sensorsSmall'>
						{blue == 1 ? (
							<FaCircle
								size='30px'
								style={{ color: "#3399ff", paddingRight: "20px" }}
							/>
						) : null}
						{red == 1 ? (
							<FaCircle size='30px' style={{ color: "#ff0000" }} />
						) : null}
					</div>
					<div className='sensorsBig'>
						{blue == 1 ? (
							<FaCircle
								size='40px'
								style={{ color: "#3399ff", paddingRight: "20px" }}
							/>
						) : null}
						{red == 1 ? (
							<FaCircle size='40px' style={{ color: "#ff0000" }} />
						) : null}
					</div>
					<div className='spacer' />
					<div className='topNavLinksRight'>
						<p
							style={{
								color: "#b3ecff",
								paddingRight: "40px",
								fontSize: "20px",
							}}
						>
							{temp}
						</p>
						<Link to='/myPets'>My pets </Link>
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
					</div>
				</div>
			</div>
		</Aux>
	);
};

export default Navbar;
