import React, { useEffect } from 'react';
const AnimeInfo = props => {
	useEffect(() => {
		console.log('I run when the MovieInfo Component is Mounted');
		console.log(props.anime.results[0]);
	}, []);
	return (
		<div>
			<h1>Title: {props.anime.results[0].title}</h1>
		</div>
	);
};
export default AnimeInfo;
