import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	useHistory
} from 'react-router-dom';

const SignIn = props => {
	const [signin, setSignin] = useState({});
	const history = useHistory();
	const handleChange = e => {
		setSignin({ ...signin, [e.target.id]: e.target.value });
	};

	const handleLogin = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(signin)
			});
			const data = await response.json();

			if (data.message) {
				alert(data.message);
				return;
			}
			window.localStorage.setItem('token', data.token);
			window.localStorage.setItem('loggedInUser', data.user.email);
			window.localStorage.setItem('id', data.user.id);
			window.localStorage.setItem('userState', data.user.state);
		} catch (error) {
			console.error(error);
		}
		history.push('/');
	};

	const bgStyle = {
		backgroundColor: 'teal'
	};
	const bgStyle1 = {
		backgroundColor: 'orange'
	};

	return (
		<div className="d-flex p-5 justify-content-center">
			<div className="card container signIn-form d-flex p-5 justify-content-center">
				<form onSubmit={handleLogin} className="row">
					<div className="row p-2 justify-content-center">
						<h2 className="text-center col-md-5 reg-card-title">
							Sign in to your account
						</h2>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
