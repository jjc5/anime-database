import React, { useEffect } from 'react';
const AnimeInfo = props => {
	useEffect(() => {
		console.log('I run when the MovieInfo Component is Mounted');
		console.log(props.anime.results[0]);
	}, []);
	return (
		<div>
			<h1>Title: {props.anime.results[0].title}</h1>
			<img src={props.anime.results[0].image_url} />
			<p>{props.anime.results[0].synopsis}</p>
		</div>
	);
};
export default AnimeInfo;
