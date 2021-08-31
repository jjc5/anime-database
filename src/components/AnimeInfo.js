import React, { useEffect } from 'react';
const AnimeInfo = props => {
	useEffect(() => {
		console.log('I run when the MovieInfo Component is Mounted');
	}, []);
	return (
		<div>
			<div className="searchedAnime">
				<h1 id="searchedTitle">{props.anime.results[0].title}</h1>
				<h1 id="searchedScore">{props.anime.results[0].score}</h1>
				<img src={props.anime.results[0].image_url} />
				<p className="synopsis">{props.anime.results[0].synopsis}</p>
			</div>
		</div>
	);
};
export default AnimeInfo;
