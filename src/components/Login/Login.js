import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";

import "./Login.css";
import { LoggedContext } from "../../context/LoggedContext";

const AddLoginSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too short!")
		.max(15, "Too long!")
		.required("Required"),
	password: Yup.string()
		.min(8, "Password is too short - minimum 8 chars")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
			"Password must contain minimum: 1 capital letter, 1 small letter, 1 digit "
		)
		.required("Required!"),
});

function Login() {
	const [user, setUser] = useState("");
	const [pet, setPet] = useState("");
	const { isLogged, setIsLogged } = useContext(LoggedContext);
	const [error, setError] = useState("");
	const history = useHistory();
	const [color, setColor] = useState("#333333");
	const usr = Cookies.get("user");
	const [isActive, setIsActive] = useState(0);
	const key = "P9T8F7R1A1P";

	const handleSubmit = (event) => {
		let data = {
			name: event.name,
			password: event.password,
		};

		Axios.post(
			"https://alarmist-donkey-0357.dataplicity.io/api/v1/login/" + key,
			data
		)
			.then((res) => {
				if (res.data.msg == "Logged successful") {
					Cookies.set("user", event.name);
					setIsLogged(true);
					history.replace("/home");
				} else if (res.data.msg == "Bad name") {
					setError("Bad name!");
				} else if (res.data.msg == "Bad password") {
					setError("Bad password!");
				}
			})
			.catch((error) => {
				if ((error = "Error: Network Error")) {
					setError("Network Error");
				}
			});
	};

	useEffect(() => {
		if (usr) {
			history.replace("/home");
		}
		const fetchData = async () => {
			const result = await Axios(
				"https://alarmist-donkey-0357.dataplicity.io/api/v1/displayActivePet/" +
					key
			);

			setPet(result.data.pet);
			setUser(result.data.user);

			console.log(result.data.pet);
		};
		fetchData();
	}, []);

	return (
		<div className='loginBody'>
			<div className='appNameLogin'>Pet Feeder</div>
			<div className='loginBox'>
				<div className='loginTitle'>Login</div>
				<Formik
					initialValues={{
						name: "",
						password: "",
					}}
					validationSchema={AddLoginSchema}
					onSubmit={(values) => {
						handleSubmit(values);
					}}
				>
					{({ errors, touched }) => (
						<Form>
							<div className='row'>
								<div className='columnLeftLogin'>
									<div>Name:</div>
									<br />
									<div className='pswdMarginTop'>Password:</div>
								</div>
								<div className='columnRightLogin'>
									<div
										className='errorLogin'
										style={
											errors.name && touched.name
												? { paddingBottom: "10%" }
												: { paddingBottom: "15%" }
										}
									>
										<Field type='text' name='name' className='fieldRegLog' />
										<br />
										{errors.name && touched.name ? errors.name : null}
									</div>
									<div
										className='errorLogin'
										style={
											errors.password && touched.password
												? { paddingBottom: "10%" }
												: { paddingBottom: "15%" }
										}
									>
										<Field
											type='password'
											name='password'
											className='fieldRegLog'
										/>
										<br />
										{errors.password && touched.password
											? errors.password
											: null}
									</div>
								</div>
							</div>
							<div className='row '>
								<div
									style={{
										width: "50%",
										float: "left",
										textAlign: "right",
										paddingTop: "1%",
									}}
								>
									<input
										className='buttonSignIn'
										type='submit'
										value='Sign in'
									/>
								</div>
								<div
									style={{
										width: "46%",
										float: "right",
										textAlign: "left",
										paddingLeft: "4%",
									}}
								>
									<Link
										to='/register'
										onMouseEnter={() => setColor("black")}
										onMouseLeave={() => setColor("#333333")}
										className='loginLink'
										style={{
											color: color,
										}}
									>
										Don't have account?
									</Link>
									<br />
									<Link
										to='/forgotPassword'
										onMouseEnter={() => setColor("black")}
										onMouseLeave={() => setColor("#333333")}
										className='loginLink'
										style={{
											color: color,
										}}
									>
										Forgot password?
									</Link>
								</div>
							</div>

							{user == undefined ? null : (
								<div className='scheduleInfo'>
									The active schedule is on the account: <br />
									{user} <br />
									The active schedule is for the pet:
									<br /> {pet}
								</div>
							)}
							<div style={{ color: "red", marginTop: "4%", fontSize: "20px" }}>
								{error}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Login;
