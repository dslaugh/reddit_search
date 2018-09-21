import React from 'react';
import List from './List';
import SubredditForm from './SubredditForm';
import { connect } from 'react-redux';

let App = ({ posts }) => {
	return (
		<div>
			<SubredditForm  />
			<div className="list-container">
				{
					Object.keys(posts).map((category) => {
						return (<List key={category} category={category} posts={posts[category]} />)
					})
				}
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	function splitIntoCategories(posts) {
		return posts.reduce((prev, curr) => {
			const matches = /\[(.*?)\]/.exec(curr.title);
			const category = matches ? matches[1].toUpperCase() : 'NONE';
			if (!prev[category]) {
				prev[category] = [];
			}
			prev[category].push(curr);
			return prev;
		}, {});
	}

	return {
		posts: splitIntoCategories(state.posts),
	};
}

export default connect(
	mapStateToProps
)(App);
