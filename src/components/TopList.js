import React, { useState } from 'react';

const TopList = props => {
	const FavoriteComponent = props.favoriteComponent;
	return (
		<>
			{props.topAnimes.map((topAnime, index) => (
				<div
					className="image-container d-flex justify-content-start m-3"
					key={topAnime.mal_id}
				>
					<img src={topAnime.image_url} alt="anime"></img>
					<div
						onClick={() => props.handleFavoriteClick(topAnime)}
						className="overlay d-flex align-items-center justify-content-center"
					>
						<FavoriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default TopList;
