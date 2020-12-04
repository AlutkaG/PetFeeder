import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

import Aux from "../../hoc/Aux";
import feed from "../../img/homeColor.png";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import SideNavbar from "../SideNavbar/SideNavbar";

function Home() {
	const history = useHistory();
	const usr = Cookies.get("user");
	const [sidenavOpen, setSidenavOpen] = useState(false);
	const key = "P9T8F7R1A1P";

	useEffect(() => {
		if (!usr) {
			history.replace("/login");
		}
	}, []);

	const openHandler = () => {
		setSidenavOpen(!sidenavOpen);
	};

	const closeNav = () => {
		setSidenavOpen(!sidenavOpen);
	};

	const clickServoHandler = () => {
		console.log("haj");
		const fetchData = async () => {
			const result = await axios(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/activate/" +
					usr +
					"/" +
					key
			);
		};
		fetchData();
	};

	return (
		<Aux>
			<Navbar openClickHandler={openHandler} />
			<SideNavbar show={sidenavOpen} onClose={closeNav} />
			<div className='home-big'>
				<div className='row'>
					<div className='columnRightHome'>
						<img
							src={feed}
							alt='Pets'
							width='750px'
							style={{
								boxShadow: "10px 10px 75px 30px rgba(0, 0, 0, 0.64)",
								borderRadius: "100%",
							}}
						/>
					</div>
					<div className='columnLeftHome'>
						<div className='textBox1'>
							<div className='text1'>Is your pet hungry?</div>
						</div>
						<button
							className='pressButton'
							onClick={() => clickServoHandler()}
						/>
					</div>
					<div className='columnCenterHome'>
						<div className='textBox2'>
							<div className='text2'>
								You can feed your pet by clicking on the button!
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='home-medium'>
				<div className='row'>
					<div className='columnRightHome'>
						<div className='photo'>
							<img src={feed} alt='Pets' className='imgHome' />
						</div>
					</div>
					<div className='columnLeftHome'>
						<div className='textBox1'>
							<div className='text1'>Is your pet hungry?</div>
						</div>

						<button
							className='pressButton'
							onClick={() => clickServoHandler()}
						/>
					</div>
					<div className='columnCenterHome'>
						<div className='textBox2'>
							<div className='text2'>
								You can feed your pet by clicking on the button!
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='home-small'>
				<div className='textBox2'>
					<div className='text2'>
						You can feed your pet by clicking on the button!
					</div>
				</div>
				<br />
				<div
					style={{
						marginLeft: "auto",
						marginRight: "auto",
						marginTop: "20px",
						width: "50%",
					}}
				>
					<button className='pressButton' onClick={() => clickServoHandler()} />
				</div>
			</div>
		</Aux>
	);
}

export default Home;
