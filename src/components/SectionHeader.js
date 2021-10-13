import React from 'react';

const SectionHeader = props => {
	return (
		<div className="col">
			<h1>{props.heading}</h1>
		</div>
	);
};

export default SectionHeader;
