import React, { useEffect } from 'react';
const AnimeInfo = props => {
	useEffect(() => {
		console.log('I run when the MovieInfo Component is Mounted');
	}, []);
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-12 col-md-4">
						<img src={props.anime.results[0].image_url} />
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-8">
						<h1 id="searchedTitle">{props.anime.results[0].title}</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-8">
						<h1 id="searchedScore">{props.anime.results[0].score}</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-12 col-md-8">
						<p className="synopsis">{props.anime.results[0].synopsis}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AnimeInfo;
