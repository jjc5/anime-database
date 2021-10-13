import React, { useState, useEffect } from 'react';
import Register from '../pages/Register';
import SignIn from '../components/SignIn';
import Header from '../components/header';
import TopList from '../components/TopList';
import SearchBar from '../components/SearchBar';
import AnimeList from '../components/AnimeList';
import AddFavorites from '../components/AddFavorites';
import SectionHeader from '../components/SectionHeader';

export default function App(props) {
	let token = window.localStorage.getItem('token');
	let userId = window.localStorage.getItem('id');
	let userState = window.localStorage.getItem('userState');

	const [animes, setAnimes] = useState([]);
	const [topAnimes, setTopAnimes] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favorites, setFavorites] = useState([]);

	const getMovieRequest = async searchValue => {
		const url = `https://api.jikan.moe/v3/search/anime?q=${searchValue}`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setAnimes(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	const addFavoriteAnime = anime => {
		const newFavoriteList = [...favorites, anime];
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
							<div className="row">
								<SearchBar
									searchValue={searchValue}
									setSearchValue={setSearchValue}
								/>
							</div>
							<div>
								<SectionHeader heading="Top Rated" />
							</div>
							<div className="row animeRow">
								<TopList
									topAnimes={topAnimes}
									handleFavoriteClick={addFavoriteAnime}
									favoriteComponent={AddFavorites}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
