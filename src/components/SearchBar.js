import React, { useState } from 'react';

const SearchBar = props => {
	return (
		<div className="col-4">
			<input
				className="form-control"
				value={props.value}
				onChange={() => props.setSearchValue(event.target.value)}
				placeholder="Search here..."
			></input>
		</div>
	);
};
export default SearchBar;
