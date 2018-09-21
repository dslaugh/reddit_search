import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from "../actions";

const SubredditForm = ({ onSubredditFormSubmit }) => (
	<div id="subredditFormContainer">
		<form id="subredditForm" onSubmit={onSubredditFormSubmit}>
			<label htmlFor="subreddit">Enter Subreddit:</label><br />
			<input type="text" id="subreddit" name="subreddit" />
			<button type="submit">Submit</button>
		</form>
	</div>
);

function mapDispatchToProps(dispatch) {
	return {
		onSubredditFormSubmit: (e) => {
			e.preventDefault();
			let inputValue = document.querySelector('#subreddit').value.trim();
			if (inputValue === '') {
				return;
			}
			dispatch(fetchPosts(inputValue));
		}
	};
}

SubredditForm.propTypes = {
	onSubredditFormSubmit: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SubredditForm);
