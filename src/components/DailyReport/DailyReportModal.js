import React, { useState, useEffect } from "react";
import Axios from "axios";

const DailyReportModal = (props) => {
	const info = props.info;

	if (!props.show) {
		return null;
	}

	const onClose = (e) => {
		props.onClose && props.onClose(e);
	};

	const listReport = info.map((report, index) => (
		<div key={index}>
			<div className='row'>
				<div style={{ width: "40%", float: "left" }}>
					<p>{report.date}</p>
				</div>{" "}
				<div style={{ width: "60%", float: "right", textAlign: "left" }}>
					<p>{report.action}</p>
				</div>
			</div>
		</div>
	));
	return (
		<div className='popupReport'>
			<div className='popupReport-inner'>
				<div className='name'>{props.name}</div>
				<div style={{ paddingBottom: "10%" }}>{listReport}</div>
				<button className='buttonClose' onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default DailyReportModal;
