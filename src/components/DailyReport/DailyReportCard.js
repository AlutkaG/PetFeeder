import React, { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

import "./DailyReport.css";
import Modal from "./DailyReportModal";

const DailyReportCard = (props) => {
	const nameArray = props.nameArray;

	const [isShow, setIsShow] = useState(false);
	const [currentName, setCurrentName] = useState("");
	const [info, setInfo] = useState([]);
	const usr = Cookies.get("user");
	const key = "P9T8F7R1A1P";

	const showModal = () => {
		setIsShow(!isShow);
	};

	const handleGetInfo = (pet) => {
		const data = {
			name: pet,
		};
		Axios.post(
			"https://alarmist-donkey-0357.dataplicity.io/api/v1/reportPet/" +
				usr +
				key,
			data
		)
			.then((res) => {
				setInfo(res.data);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};
	const listPetsReport = nameArray.map((name, index) => (
		<button
			key={index}
			className='reportCard'
			onClick={(e) => {
				showModal();
				handleGetInfo(name);
				setCurrentName(name);
			}}
		>
			<div className='reportName' style={{ textAlign: "center" }}>
				{name}
			</div>
		</button>
	));
	return (
		<div className='listPets'>
			{listPetsReport}
			<Modal onClose={showModal} show={isShow} info={info} name={currentName} />
		</div>
	);
};

export default DailyReportCard;
