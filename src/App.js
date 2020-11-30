import React, { useState, useMemo } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import MyPets from "./components/MyPets/MyPets";
import DailyReport from "./components/DailyReport/DailyReport";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { LoggedContext } from "./context/LoggedContext";

function App() {
	const [isLogged, setIsLogged] = useState(null);

	const value = useMemo(() => ({ isLogged, setIsLogged }), [
		isLogged,
		setIsLogged,
	]);

	return (
		<Router>
			<div className='App'>
				<div className='container'>
					<LoggedContext.Provider value={value}>
						<Switch>
							<Route exact path='/'>
								<Redirect to='login' />
							</Route>
							<Route path='/home' component={Home} />
							<Route path='/myPets' component={MyPets} />
							<Route path='/dailyReport' component={DailyReport} />
							<Route path='/register' component={Register} />
							<Route path='/login' component={Login} />
							<Route path='/forgotPassword' component={ForgotPassword} />
							<Route path='*'>
								<Redirect to='/login' />
							</Route>
						</Switch>
					</LoggedContext.Provider>
				</div>
			</div>
		</Router>
	);
}

export default App;
