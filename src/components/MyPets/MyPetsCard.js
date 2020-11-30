import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "./MyPets.css";
import Modal from "./Modal";
import Aux from "../../hoc/Aux";

import Axios from "axios";

const PetCard = (props) => {
	const [isShow, setIsShow] = useState(false);
	const [currentPet, setCurrentPet] = useState("");
	const [idActivePrev, setIdActivePrev] = useState(-1);
	const [indexNow, setIndexNow] = useState(-1);
	const [petIdPrev, setPetIdPrev] = useState(0);
	const [isClicked, setIsClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isChangeClick, setIsChangeClick] = useState(false);
	const usr = Cookies.get("user");
	const info = props.info;
	const key = "P9T8F7R1A1P";

	const showModal = () => {
		setIsShow(!isShow);
	};

	const actualPet = (pet, index) => {
		setCurrentPet(pet);
		setIndexNow(index);
	};

	const saveModal = (pet) => {
		info[indexNow] = pet;
		props.save(indexNow, pet);
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await Axios(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/getActiveId/" +
					usr +
					"/" +
					key
			);
			console.log(info.length);
			for (let i = 0; i < info.length; i++) {
				console.log(info[i]);
				if (info[i].active == 1) {
					setIdActivePrev(i);
					console.log("ej");
				}
			}
			setPetIdPrev(result.data.id);
			console.log("id prev2: " + idActivePrev);
			console.log("id now2: " + indexNow);
		};

		if (!isLoading || isClicked || isChangeClick) {
			fetchData();
			setIsClicked(false);
			setIsLoading(true);
			setIsChangeClick(false);
		}
	}, [isLoading, isClicked, isChangeClick]);
	const changeActive = (id, index) => {
		if (indexNow != index && !isChangeClick) {
			console.log("idddddddd: " + id);
			const data = {
				idEn: id,
			};

			setIndexNow(index);
			Axios.post(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/enabled/" +
					usr +
					"/" +
					key,
				data
			)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error.response);
				});
			props.active(index);
			setIsChangeClick(true);
		} else if (indexNow == index && !isChangeClick) {
			const data = {
				idDis: id,
			};

			setIndexNow(-1);
			Axios.post(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/disabled/" +
					usr +
					"/" +
					key,
				data
			)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error.response);
				});
			props.disabled(index);
			setIsChangeClick(true);
		}
	};

	const deleteHandle = (id, name, index) => {
		const data = {
			id: id,
			name: name,
		};
		Axios.post(
			"https://alarmist-donkey-0357.dataplicity.io/api/v1/delete/" +
				usr +
				"/" +
				key,
			data
		)
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				console.log(error.response);
			});
		props.delete(index);
	};

	const listPets = info.map((pet, index) => (
		<Aux>
			<div className='petCardBig'>
				<div className='petCard' key={index}>
					<div className='row'>
						<div className='columnLeftCard namePet'>{pet.name}</div>
						<div className='columnRightCard'>
							<button
								className='cardButton'
								style={
									pet.active
										? { backgroundColor: "green" }
										: { backgroundColor: "#737373" }
								}
								onClick={(e) => {
									changeActive(pet.id, index);
								}}
							>
								{pet.active ? "Enabled" : "Disabled"}
							</button>
							<br />
							<button
								className='cardButton'
								style={{ backgroundColor: "#006699" }}
								onClick={(e) => {
									showModal();
									actualPet(pet, index);
								}}
							>
								Edit
							</button>
							<br />
							<button
								className='cardButton'
								style={{ backgroundColor: "black" }}
								onClick={(e) => {
									deleteHandle(pet.id, pet.name, index);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='petCardSmall'>
				<div className='petCard' key={index}>
					<div className='namePet'>{pet.name}</div>
					<button
						className='cardButton'
						style={
							pet.active
								? { backgroundColor: "green" }
								: { backgroundColor: "#737373" }
						}
						onClick={(e) => {
							changeActive(pet.id, index);
						}}
					>
						{pet.active ? "Enabled" : "Disabled"}
					</button>
					<br />
					<button
						className='cardButton'
						style={{ backgroundColor: "#006699" }}
						onClick={(e) => {
							showModal();
							actualPet(pet, index);
						}}
					>
						Edit
					</button>
					<br />
					<button
						className='cardButton'
						style={{ backgroundColor: "black" }}
						onClick={(e) => {
							deleteHandle(pet.id, pet.name, index);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</Aux>
	));
	return (
		<div>
			{listPets}
			<Modal
				onClose={showModal}
				show={isShow}
				currentPet={currentPet}
				saveModal={saveModal}
				schema={info.schema}
				options={info.options}
				style={info.style}
			/>
		</div>
	);
};

export default PetCard;
