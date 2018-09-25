import React from 'react';
import SubredditForm from './SubredditForm';
import List from './List';
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

function splitIntoCategories(posts) {
	const dups = {
		'ACC': 'ACCESSORIES',
		'ACCESSORY': 'ACCESSORIES',
		'PISTOL': 'HANDGUNS',
		'HANDGUN': 'HANDGUNS',
		'MAGAZINE': 'MAGAZINES',
		'OPTIC': 'OPTICS',
	};

	return posts.reduce((prev, curr) => {
		const matches = /\[(.*?)\]/.exec(curr.title);
		if (matches) {
			curr.title = curr.title.split(matches[0])[1].trim();
		}

		let category = matches ? matches[1].toUpperCase() : 'NONE';

		if (dups[category]) {
			category = dups[category];
		}

		if (!prev[category]) {
			prev[category] = [];
		}

		prev[category].push(curr);
		return prev;
	}, {});
}

function mapStateToProps(state) {
	return {
		posts: splitIntoCategories(state.posts),
	};
}

export default connect(
	mapStateToProps
)(App);
