import React, { useState, useEffect } from 'react';
import Register from '../pages/Register';
import SignIn from '../components/SignIn';
import Header from '../components/header';
import TopList from '../components/TopList';
import SearchBar from '../components/SearchBar';
import AnimeList from '../components/AnimeList';
import AddFavorites from '../components/AddFavorites';
import SectionHeader from '../components/SectionHeader';
import RemoveFavorites from '../components/RemoveFavorites';
import AnimeInfo from '../components/AnimeInfo';

export default function App(props) {
	let token = window.localStorage.getItem('token');
	let userId = window.localStorage.getItem('id');
	let userState = window.localStorage.getItem('userState');

	const [animes, setAnimes] = useState([]);
	const [topAnimes, setTopAnimes] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favorites, setFavorites] = useState([]);
	const [anime, updateAnime] = useState({});

	const [query, updateQuery] = useState({
		baseURL: 'https://api.jikan.moe/v3',
		option: '?q=',
		title: '',
		searchURL: ''
	});

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

	// const getAnimeRequest = async searchValue => {
	// 	const url = `https://api.jikan.moe/v3/search/anime?q=${searchValue}`;
	//
	// 	const response = await fetch(url);
	// 	const responseJson = await response.json();
	//
	// 	if (responseJson.Search) {
	// 		setAnimes(responseJson.Search);
	// 	}
	// };
	//
	// useEffect(() => {
	// 	getAnimeRequest(searchValue);
	// }, [searchValue]);

	useEffect(() => {
		const animeFavorites = JSON.parse(
			localStorage.getItem('react-anime-app-favorites')
		);

		if (animeFavorites) {
			setFavorites(animeFavorites);
		}
	}, []);

	const saveToLocalStorage = items => {
		localStorage.setItem('react-anime-app-favorites', JSON.stringify(items));
	};

	const addFavoriteAnime = anime => {
		const newFavoriteList = [...favorites, anime];
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	const removeFavoriteAnime = anime => {
		const newFavoriteList = favorites.filter(
			favorite => favorite.mal_id !== anime.mal_id
		);
		setFavorites(newFavoriteList);
	};
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					'https://api.jikan.moe/v3/top/anime/1/bypopularity'
				);
				const data = await response.json();
				setTopAnimes(data.top);
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
			<Header />
			{!token ? (
				<>
					<SignIn />
				</>
			) : (
				<>
					<div className="AppPage">
						<div className="container-fluid">
							<div className="row d-flex align-items-center mt-4 mb-4">
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
							<div className="row d-flex align-items-center mt-4 mb-4">
								<SectionHeader heading="Top Rated" />
							</div>
							<div className="row animeRow">
								<TopList
									topAnimes={topAnimes}
									handleFavoriteClick={addFavoriteAnime}
									favoriteComponent={AddFavorites}
								/>
							</div>
							<div className="row d-flex align-items-center mt-4 mb-4">
								<SectionHeader heading="My List" />
							</div>
							<div className="row animeRow">
								<TopList
									topAnimes={favorites}
									handleFavoriteClick={removeFavoriteAnime}
									favoriteComponent={RemoveFavorites}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
