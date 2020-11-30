import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import Cookies from "js-cookie";

import Axios from "axios";

const AddPetSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too short!")
		.max(8, "Too long!")
		.required("Please enter the name"),
	type: Yup.string().required("Please enter the type"),
	portion: Yup.number()
		.min(1, "Minimum 1 serving!")
		.max(6, "Maximum 6 servings!")
		.required("Please enter the portion"),
	hours: Yup.array()
		.of(Yup.number().min(0, "Minimum 0").max(23, "Maximum 23"))
		.required("Please enter the hours"),
	minutes: Yup.array()
		.of(Yup.number().min(0, "Minimum 0").max(59, "Maximum 59"))
		.required("Please enter the minutes"),
});

const options = [
	{ value: "cat", label: "Cat" },
	{ value: "dog", label: "Dog" },
	{ value: "rabbit", label: "Rabbit" },
	{ value: "guinea pig", label: "Guinea Pig" },
	{ value: "hamster", label: "Hamster" },
];

const selectStyles = {
	control: (style) => ({
		...style,
		outline: "none",
	}),
	option: (provided, state) => ({
		...provided,
		borderBottom: "1px ",
		color: state.isSelected ? "black" : "#333333",
		backgroundColor: "white",
		"&:hover": {
			backgroundColor: "#c8bab6",
		},
		padding: 10,
	}),
};
const Modal = (props) => {
	const pet = props.currentPet;
	const [id, setId] = useState(0);
	const [name, setName] = useState(pet.name);
	const [type, setType] = useState("");
	const [portion, setPortion] = useState("");
	const [hours, setHours] = useState("");
	const [minutes, setMinutes] = useState("");
	const usr = Cookies.get("user");
	const key = "P9T8F7R1A1P";

	const onClose = (e) => {
		props.onClose && props.onClose(e);
	};

	useEffect(() => {
		setId(pet.id);
		setName(pet.name);
		setType(pet.type);
		setPortion(pet.portion);
		setHours(pet.hours);
		setMinutes(pet.minutes);
	}, [pet.id, pet.name, pet.type, pet.portion, pet.hours, pet.minutes]);

	if (!props.show) {
		return null;
	}

	const handleSave = (val) => {
		console.log(val.name);

		const data = {
			id: id,
			name: val.name,
			type: val.type,
			portion: val.portion,
			hours: val.hours,
			minutes: val.minutes,
			active: pet.active,
		};

		props.saveModal(data);
		Axios.post(
			"http://catfeeder.ddns.net/api/v1/update/" + usr + "/" + key,
			data
		)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	const handleTypeChange = (selectedType) => {
		setType(selectedType.value);
		console.log(selectedType.value);
	};

	return (
		<div className='popup'>
			<div className='popup-inner'>
				<div style={{ fontSize: "50px" }}>Edit</div>
				<div className='row'>
					<Formik
						initialValues={{
							name: pet.name,
							type: pet.type,
							portion: pet.portion,
							hours: "[" + pet.hours + "]",
							minutes: "[" + pet.minutes + "]",
						}}
						validationSchema={AddPetSchema}
						onSubmit={(values) => {
							handleSave(values);
						}}
					>
						{({ errors, touched, handleChange, values }) => (
							<Form className='formAddPet'>
								<div className='row'>
									<div className='columnLeftFormSelect'>
										<div style={{ paddingBottom: "1%" }}>Name: </div>
										<br /> <div style={{ paddingBottom: "1%" }}>Type:</div>{" "}
										<br /> <div style={{ paddingBottom: "1%" }}>Portion:</div>{" "}
										<br /> <div style={{ paddingBottom: "1%" }}>Hours:</div>{" "}
										<br /> <div style={{ paddingBottom: "1%" }}>Minutes: </div>{" "}
									</div>
									<div className='columnRightFormSelect'>
										<Field
											className='input'
											type='text'
											placeholder='Name...'
											name='name'
										/>
										<div
											style={{
												fontSize: "15px",
												color: "red",
											}}
										>
											{errors.name && touched.name ? (
												<div style={{ marginTop: "-6%", marginBottom: "2%" }}>
													{errors.name}
												</div>
											) : null}
										</div>
										<Select
											placeholder='Type...'
											options={options}
											onChange={(select) => {
												handleTypeChange(select);
												handleChange("type")(select.value);
											}}
											styles={selectStyles}
											name='type'
											className='inputSelect'
										/>
										<div
											style={{
												fontSize: "15px",
												color: "red",
											}}
										>
											{errors.type && touched.type ? (
												<div style={{ marginTop: "-6%" }}>{errors.type}</div>
											) : null}{" "}
										</div>
										<Field
											className='input'
											type='text'
											placeholder='Portion (1 portion -> 1 rotation of the servo)...'
											name='portion'
										/>
										<div
											style={{
												fontSize: "15px",
												color: "red",
											}}
										>
											{errors.portion && touched.portion ? (
												<div style={{ marginTop: "-6%" }}>{errors.portion}</div>
											) : null}
										</div>

										<Field
											className='input'
											type='text'
											placeholder='Hour (1-24)...'
											name='hours'
										/>
										<div
											style={{
												fontSize: "15px",
												color: "red",
											}}
										>
											{errors.hours && touched.hours ? (
												<div style={{ marginTop: "-6%" }}>{errors.hours}</div>
											) : null}
										</div>

										<Field
											className='input'
											type='text'
											placeholder='Minutes (1-59)...'
											name='minutes'
										/>
										<div
											style={{
												fontSize: "15px",
												color: "red",
											}}
										>
											{errors.minutes && touched.minutes ? (
												<div style={{ marginTop: "-6%", marginBottom: "2%" }}>
													{errors.minutes}
												</div>
											) : null}
										</div>
									</div>
								</div>
								<button className='buttonSave' type='submit'>
									Save
								</button>
								<button className='buttonClose' onClick={onClose}>
									Close
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Modal;
