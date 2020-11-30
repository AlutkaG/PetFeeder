import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Aux from "../../hoc/Aux";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import DailyReportCard from "./DailyReportCard";
import Navbar from "../Navbar/Navbar";
import SideNavbar from "../SideNavbar/SideNavbar";

function DailyReport() {
	const [nameArray, setNameArray] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [sidenavOpen, setSidenavOpen] = useState(false);
	const history = useHistory();
	const usr = Cookies.get("user");
	const key = "P9T8F7R1A1P";

	useEffect(() => {
		if (!usr) {
			history.replace("/login");
		}
		const fetchData = async () => {
			const result = await Axios(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/list/" + usr + key
			);
			for (let i = 0; i < result.data.length; i++) {
				setNameArray((prev) => [...prev, result.data[i].name]);
			}
			setIsLoading(true);
		};
		if (!isLoading) {
			fetchData();
		}
	}, []);

	const openHandler = () => {
		setSidenavOpen(!sidenavOpen);
	};

	const closeNav = () => {
		setSidenavOpen(!sidenavOpen);
	};
	return (
		<Aux>
			<Navbar openClickHandler={openHandler} />
			<SideNavbar show={sidenavOpen} onClose={closeNav} />
			<div style={{ paddingTop: "10%" }}>
				<DailyReportCard nameArray={nameArray} />
			</div>
		</Aux>
	);
}

export default DailyReport;
