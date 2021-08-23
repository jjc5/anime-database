import React, { useState, useEffect } from 'react';
import AnimeInfo from '../components/AnimeInfo.js';

export default function App(props) {
	const [query, updateQuery] = useState({
		baseURL: 'https://api.jikan.moe/v3',
		option: '?q=',
		title: '',
		searchURL: ''
	});
	const [anime, updateAnime] = useState({});
	useEffect(() => {
		query.searchURL.length > 0 &&
			(async () => {
				try {
					const response = await fetch(query.searchURL);
					const data = await response.json();
					updateAnime({ ...data });
					updateQuery({ ...query, title: '', searchURL: '' });
				} catch (e) {
					console.error(e);
				}
			})();
	}, [query]);
	const handleChange = event => {
		updateQuery({ ...query, ...{ [event.target.id]: event.target.value } });
	};
	const handleSubmit = event => {
		event.preventDefault();
		updateQuery({
			...query,
			searchURL: query.baseURL + '/search/anime' + query.option + query.title
		});
	};
	return (
		<div className="AppPage">
			<h1>Anime Search</h1>
			<form onSubmit={handleSubmit}>
				<input
					id="title"
					type="text"
					value={query.title}
					onChange={handleChange}
					placeholder="Title"
				/>
				<input type="submit" value="Search" />
			</form>
			<main className="Page">
				{Object.keys(anime).length ? <AnimeInfo anime={anime} /> : ''}
			</main>
		</div>
	);
}
