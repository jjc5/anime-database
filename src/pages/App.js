import React, { useState, useEffect } from 'react';
import AnimeInfo from '../components/AnimeInfo.js';
import Create from '../components/Create.js';
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

	const [animes, setAnimes] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/animes');
				const data = await response.json();
				setAnimes(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [animes]);

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

	const handleDelete = async animeId => {
		try {
			const response = await fetch(`/api/animes/${animeId}`, {
				method: 'DELETE',
				header: {
					'Content-Type': 'application/json'
				}
			});
			const deletedAnime = await response.json();
		} catch (error) {
			console.error(error);
		}
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
				<Create animes={animes} setAnimes={setAnimes} />
				<ul id="favesUl">
					{animes.map(animes => {
						return (
							<li id="favesLi" key={animes._id}>
								<h1 id="favoriteTitle">{animes.title}</h1>
								<button
									className="deleteBtn"
									onClick={() => {
										handleDelete(animes._id);
									}}
								>
									<img
										id="trashcan"
										src="https://cdn.iconscout.com/icon/premium/png-512-thumb/trash-can-1778449-1515973.png"
									></img>
								</button>
							</li>
						);
					})}
				</ul>
				<ul className="ulTopAnimes">
					{topAnimes &&
						topAnimes.map(topAnime => {
							return (
								<li className="topAnimeList" key={topAnime.mal_id}>
									<h3 className="topAnimesTitles">{topAnime.title}</h3>
									<img
										id="star"
										src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png"
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
