import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	useHistory
} from 'react-router-dom';
import { withRouter } from 'react-router';

const Header = props => {
	const history = useHistory();

	useEffect(() => {
		if (window.localStorage.getItem('token')) {
			window.localStorage.getItem('loggedInUser');
		}
	}, []);

	const handleLogout = () => {
		localStorage.clear();
		history.push('/');
	};

	return (
		<div id="header" className="navbar navbar-dark bg-dark">
			<div id="header" className="mr-auto p-2">
				<div className="display-3">Anime Database</div>
			</div>
			{!window.localStorage.getItem('token') ? (
				<> </>
			) : (
				<>
					<div>
						<p className="p-1">
							Hello {window.localStorage.getItem('loggedInUserName')}
						</p>
						<button className="btn btn-light" onClick={handleLogout}>
							Logout
						</button>
					</div>
				</>
			)}
		</div>
	);
};
export default withRouter(Header);
