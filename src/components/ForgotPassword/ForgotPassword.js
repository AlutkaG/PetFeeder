import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";

import "./ForgotPassword.css";

const AddForgotPasswordSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too short!")
		.max(15, "Too long!")
		.required("Required"),
	question: Yup.string()
		.min(2, "Too short! Minimum 2 letters!")
		.max(15, "Too long! Maximum 15 letters!")
		.required("Required"),
	password: Yup.string()
		.min(8, "Password is too short - minimum 8 chars")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
			"Password must contain minimum: 1 capital letter, 1 small letter, 1 digit "
		)
		.required("Required!"),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Required!"),
});

function ForgotPassword() {
	const history = useHistory();
	const [color, setColor] = useState("#333333");
	const usr = Cookies.get("user");
	const [error, setError] = useState("");
	const key = "P9T8F7R1A1P";

	const handleSubmit = (event) => {
		let data = {
			name: event.name,
			password: event.password,
			question: event.question,
		};

		Axios.post(
			"https://alarmist-donkey-0357.dataplicity.io/api/v1/forgotPassword/" +
				key,
			data
		)
			.then((res) => {
				console.log(res);
				if (res.data.msg == "Change successful") {
					history.replace("/login");
				} else if (res.data.msg == "Bad name") {
					setError("Bad name!");
				} else if (res.data.msg == "Bad answer") {
					setError("Bad answer!");
				}
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	useEffect(() => {
		if (usr) {
			history.replace("/home");
		}
	});
	return (
		<div className='loginBody'>
			<div className='appNameLogin'>Pet Feeder</div>
			<div className='registerBox'>
				<div className='changePswdName'>Change Password</div>
				<Formik
					initialValues={{
						name: "",
						password: "",
						passwordConfirm: "",
						question: "",
					}}
					validationSchema={AddForgotPasswordSchema}
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
									<div>What's the name of your favorite pet?</div>
									<br />
									<div>Password:</div>
									<br />
									<div>Password confirm:</div>
								</div>
								<div className='columnRightLogin'>
									<div
										className={
											window.matchMedia("(max-width:500px)")
												? "errorFPSmall"
												: "errorLogin"
										}
										style={
											errors.name && touched.name
												? { paddingBottom: "6%" }
												: { paddingBottom: "20px" }
										}
									>
										<Field type='text' name='name' className='fieldRegLog' />
										<br />
										{errors.name && touched.name ? errors.name : null}
									</div>
									<div
										className={
											window.matchMedia("(max-width:500px)")
												? "errorFPSmall2"
												: "errorLogin"
										}
										style={
											errors.question && touched.question
												? { paddingBottom: "12%" }
												: { paddingBottom: "20px" }
										}
									>
										<Field
											type='text'
											name='question'
											className='fieldRegLog'
										/>
										<br />
										{errors.question && touched.question
											? errors.question
											: null}
									</div>
									<div
										className={
											window.matchMedia("(max-width:500px)")
												? "errorFPSmall"
												: "errorLogin"
										}
										style={
											errors.password && touched.password
												? { paddingBottom: "6%" }
												: { paddingBottom: "5px" }
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
									<div
										className={
											window.matchMedia("(max-width:500px)")
												? "errorFPSmall3"
												: "errorLogin"
										}
										style={
											errors.passwordConfirm && touched.passwordConfirm
												? { paddingBottom: "10%" }
												: { paddingBottom: "15%" }
										}
									>
										<Field
											type='password'
											name='passwordConfirm'
											className='fieldRegLog'
										/>
										<br />
										{errors.passwordConfirm && touched.passwordConfirm
											? errors.passwordConfirm
											: null}
									</div>
								</div>
							</div>
							<div className='row loginBig'>
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
										value='Submit'
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
										to='/login'
										onMouseEnter={() => setColor("black")}
										onMouseLeave={() => setColor("#333333")}
										style={{
											fontSize: "18px",
											textDecoration: "none",
											color: color,
										}}
									>
										Don you want to log in?
									</Link>
									<br />
									<Link
										to='/register'
										onMouseEnter={() => setColor("black")}
										onMouseLeave={() => setColor("#333333")}
										style={{
											fontSize: "18px",
											textDecoration: "none",
											color: color,
										}}
									>
										Do you want to register?
									</Link>
								</div>
							</div>
							<div className='loginSmall'>
								<input
									className='buttonSignIn'
									type='submit'
									value='Submit'
									style={{ marginBottom: "10px" }}
								/>
								<br />
								<Link
									to='/login'
									onMouseEnter={() => setColor("black")}
									onMouseLeave={() => setColor("#333333")}
									style={{
										fontSize: "18px",
										textDecoration: "none",
										color: color,
									}}
								>
									Don you want to log in?
								</Link>
								<br />
								<Link
									to='/register'
									onMouseEnter={() => setColor("black")}
									onMouseLeave={() => setColor("#333333")}
									style={{
										fontSize: "18px",
										textDecoration: "none",
										color: color,
									}}
								>
									Do you want to register?
								</Link>
							</div>
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

export default ForgotPassword;
