import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	useHistory
} from 'react-router-dom';

const RegisterInfo = props => {
	const [personal, setPersonal] = useState({
		name: '',
		email: '',
		password: ''
	});
	const history = useHistory();

	const [confirmPassword, setConfirmPassword] = useState({
		cpassword: ''
	});

	const handleChangePersonal = e => {
		setPersonal({ ...personal, [e.target.id]: e.target.value });
	};

	const handleChangeConfirmPassword = e => {
		setConfirmPassword({ ...confirmPassword, [e.target.id]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		if (personal.password !== confirmPassword.cpassword) {
			alert('Passwords do not match');
			setPersonal({ ...personal, password: '' });
			setConfirmPassword({ cpassword: '' });
			return;
		}
		const allData = {
			...personal
		};
		try {
			const response = await fetch('/api/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(allData)
			});

			const data = await response.json();
			if (data.message) {
				alert(data.message);
				return;
			}
		} catch (error) {
			console.error(error);
		}
		history.push('/');
	};

	const containerStyle = {
		width: '40vw'
	};

	const bgStyle = {
		backgroundColor: 'rgb(40, 44, 49)'
	};

	const bgStyle1 = {
		border: 'black 1px inset'
	};

	const bgStyle2 = {
		backgroundColor: 'rgb(235, 154, 255)'
	};

	return (
		<>
			<div className="container">
				<h3 className="row justify-content-center">Register your account</h3>
				<form
					onSubmit={handleSubmit}
					className="row justify-content-center"
					id="registerForm"
					style={bgStyle1}
				>
					<div className="col-md-auto">
						<div className="p-1">
							<i className="fa fa-wpforms icon"></i>
							<input
								className="input-field"
								id="name"
								type="text"
								placeholder="Username"
								value={personal.name}
								onChange={handleChangePersonal}
								required
							/>
						</div>
						<div className="p-1">
							<i className="fa fa-wpforms icon"></i>
							<input
								className="input-field"
								id="email"
								type="text"
								placeholder="Email"
								value={personal.email}
								onChange={handleChangePersonal}
								required
							/>
						</div>
						<div className="p-1">
							<i className="fa fa-wpforms icon"></i>
							<input
								className="input-field"
								id="password"
								type="password"
								placeholder="Password"
								value={personal.password}
								onChange={handleChangePersonal}
								required
							/>
						</div>
						<div className="p-1">
							<i className="fa fa-wpforms icon"></i>
							<input
								className="input-field"
								id="cpassword"
								type="password"
								placeholder="Confirm Password"
								value={confirmPassword.cpassword}
								onChange={handleChangeConfirmPassword}
								required
							/>
						</div>
					</div>
				</form>
				<div className="row justify-content-center" style={bgStyle}>
					<button
						type="submit"
						className="p-2 m-3 btn-lg btn btn-light"
						value="SUBMIT"
						form="registerForm"
					>
						SUBMIT
					</button>
				</div>
			</div>
		</>
	);
};
export default RegisterInfo;
