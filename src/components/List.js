import React from 'react';
import ListItem from './ListItem';

const List = ({ posts, category }) => {
	if (posts && posts.length && posts.length > 0) {
		return (
			<div className="list">
				<h2>{category}</h2>
				{posts.map((post, index) => (
					<ListItem key={index} post={post} />
				))}
			</div>
		);
	}
	return (<div>No posts found</div>);
};

export default List;
