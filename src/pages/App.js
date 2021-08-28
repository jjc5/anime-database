import React, { useState, useEffect } from 'react';
import AnimeInfo from '../components/AnimeInfo.js';
import TopPopularity from '../components/TopPopularity.js';
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

	const [topAnimes, setTopAnimes] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					'https://api.jikan.moe/v3/top/anime/1/bypopularity'
				);
				const data = await response.json();
				console.log(data.top);
				setTopAnimes(data.top);
				console.log(topAnimes);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

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
		<div>
			<div className="AppPage">
				<div className="searchDiv">
					<h1 id="animeSearch">Anime アニメ</h1>
					<form id="searchForm" onSubmit={handleSubmit}>
						<input
							id="title"
							type="text"
							value={query.title}
							onChange={handleChange}
							placeholder="Title"
						/>
						<input type="submit" value="Search" />
					</form>
				</div>
				<main className="Page">
					{Object.keys(anime).length ? <AnimeInfo anime={anime} /> : ''}
				</main>
				<ul className="ulTopAnimes">
					{topAnimes &&
						topAnimes.map(topAnime => {
							return (
								<li className="topAnimeList" key={topAnime.mal_id}>
									<h3 className="topAnimesTitles">{topAnime.title}</h3>
									<img
										id="star"
										src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dm2DONgcXDtMmxqN-qw1ZuyQ1nmBiU1WTw&usqp=CAU"
									/>
									{topAnime.score}
									<br />
									<img id="topAnimesImages" src={topAnime.image_url} />
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
}
