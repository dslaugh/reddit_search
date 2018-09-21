import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = ({ posts, category }) => {
	if (posts && posts.length && posts.length > 0) {
		return (
			<div className="list">
				<h2>{category}</h2>
				{posts.map((post, index) => (
					<ListItem key={ index } url={ post.url } title={ post.title } />
				))}
			</div>
		);
	}
	return (<div>No posts found</div>);
};

List.propTypes = {
	category: PropTypes.string,
	posts: PropTypes.arrayOf(PropTypes.shape({
		url: PropTypes.string,
		title: PropTypes.string,
	})),
};

export default List;
