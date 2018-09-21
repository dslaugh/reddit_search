import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ url, title }) => (
	<div className="list-item">
		<div className="go-btn-container">
			<a href={url} target="_blank" >Go</a>
		</div>
		<div className="list-item-title">
			{ title }
		</div>
	</div>
);

ListItem.propTypes = {
	url: PropTypes.string,
	title: PropTypes.string,
};

export default ListItem;
