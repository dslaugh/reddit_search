import React from 'react';

const ListItem = ({ post }) => (
	<div className="list-item">
		<div className="go-btn-container">
			<a href={post.url} target="_blank" >Go</a>
		</div>
		<div className="list-item-title">
			{ post.title }
		</div>
	</div>
);

export default ListItem;
