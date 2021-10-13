import React from 'react';

const AnimeList = props => {
	return (
		<>
			{props.animes.map((topAnime, index) => (
				<div className="image-container d-flex justify-content-start m-3">
					<img src={topAnime.image_url} alt="anime"></img>
				</div>
			))}
		</>
	);
};

export default AnimeList;
