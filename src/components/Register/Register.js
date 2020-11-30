import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import "./Register.css";

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
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Required!"),
	question: Yup.string()
		.min(2, "Too short! Minimum 2 letters!")
		.max(15, "Too long! Maximum 15 letters!")
		.required("Required"),
});

const Register = () => {
	const [error, setError] = useState("");
	const history = useHistory();
	const [color, setColor] = useState("#333333");
	const usr = Cookies.get("user");
	const key = "P9T8F7R1A1P";

	const handleSubmit = (event) => {
		let data = {
			name: event.name,
			password: event.password,
			question: event.question,
		};

		Axios.post(
			"https://alarmist-donkey-0357.dataplicity.io/api/v1/register/" + key,
			data
		)
			.then((res) => {
				console.log(res);
				if (res.data.msg == "Registration successful") {
					history.replace("/login");
				} else if (res.data.msg == "Account is already exist") {
					setError("Account is already exist!");
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
	}, []);

	return (
		<div className='loginBody'>
			<div className='appNameLogin'>Pet Feeder</div>
			<div className='registerBox'>
				<div
					style={{
						fontSize: "50px",
						marginBottom: "7%",
						paddingBottom: "2%",
						paddingTop: "5%",
						borderStyle: "none none solid none",
						borderWidth: "1px",
						color: "white",
						backgroundColor: "rgba(0,0,0,0.8)",
					}}
				>
					Registration
				</div>
				<Formik
					initialValues={{
						name: "",
						password: "",
						passwordConfirm: "",
						question: "",
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
									<div>Password:</div>
									<br />
									<div>Password confirm:</div>
									<br />
									<div>What's the name of your favorite pet?</div>
								</div>
								<div className='columnRightLogin'>
									<div
										className={
											window.matchMedia("(max-width:500px)")
												? "errorRegisterSmall"
												: "errorLogin"
										}
										style={
											errors.name && touched.name
												? { paddingBottom: "6%" }
												: { paddingBottom: "30px" }
										}
									>
										<Field type='text' name='name' className='fieldRegLog' />
										<br />
										{errors.name && touched.name ? errors.name : null}
									</div>
									<div
										className={
											window.matchMedia("(max-width:500px)")
												? "errorRegisterSmall2"
												: "errorLogin"
										}
										style={
											errors.password && touched.password
												? { paddingBottom: "6%" }
												: { paddingBottom: "10px" }
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
												? "errorRegisterSmall3"
												: "errorLogin"
										}
										style={
											errors.passwordConfirm && touched.passwordConfirm
												? { paddingBottom: "10%" }
												: { paddingBottom: "25px" }
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
									<div
										className={
											window.matchMedia("(max-width:500px)")
												? "errorRegisterSmall"
												: "errorLogin"
										}
										style={
											errors.question && touched.question
												? { paddingBottom: "12%" }
												: { paddingBottom: "15%" }
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
										value='Sign up'
									/>
								</div>
								<div
									style={{
										width: "46%",
										float: "right",
										textAlign: "left",
										paddingLeft: "4%",
										paddingTop: "2%",
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
										Have you already an account?
									</Link>
								</div>
							</div>
							<div className='loginSmall' style={{ paddingTop: "10px" }}>
								{" "}
								<input
									style={{ marginBottom: "10px" }}
									className='buttonSignIn'
									type='submit'
									value='Sign in'
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
									Have you already an account?
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
};

export default Register;
