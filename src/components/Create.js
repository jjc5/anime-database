import React, { useState, useEffect } from 'react';

function Create(props) {
	const [animes, setAnimes] = useState([]);
	const [newAnime, setNewAnime] = useState({
		title: ''
	});
	const handleSubmit = async e => {
		event.preventDefault();
		try {
			const response = await fetch('/api/animes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newAnime)
			});
			const data = await response.json();
			console.log(newAnime);
			setAnimes([...animes, data]);
			setNewAnime({
				title: ''
			});
		} catch (error) {
			console.error(error);
		}
	};
	const handleChange = e => {
		setNewAnime({ ...newAnime, [e.target.id]: e.target.value });
	};

	return (
		<div className="NewAnime">
			<p></p>
			<div>
				<form id="favoriteForm" onSubmit={handleSubmit}>
					<input
						type="text"
						id="title"
						placeholder="Add a Favorite (By Title)"
						onChange={handleChange}
					/>
					<button type="submit" value="add">
						Add
					</button>
				</form>
			</div>
		</div>
	);
}

export default Create;
