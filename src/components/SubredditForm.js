import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from "../actions";
import constants from '../constants';

const SubredditForm = ({ dispatch }) => {
	let subredditInput = React.createRef();
	let numPostsInput = React.createRef();

	function handleFormSubmit(e) {
		e.preventDefault();
		let subredditValue = subredditInput.current.value.trim();
		if (subredditValue === '') {
			return;
		}
		let numPostsValue = parseInt(numPostsInput.current.value.trim(), 10) || constants.DEFAULT_NUM_POSTS;
		dispatch(fetchPosts(subredditValue, numPostsValue));
	}

	return (
		<div id="subredditFormContainer">
			<form id="subredditForm" onSubmit={handleFormSubmit}>
				<div>
					<label htmlFor='subreddit_input'>Subreddit:</label>
					<input type="text" id="subreddit_input" ref={subredditInput} placeholder="Enter subreddit..." />
				</div>
				<div>
					<label htmlFor='num_posts_input'>Number of Posts:</label>
					<input type="text" id="num_posts_input" size="2" defaultValue="50" ref={numPostsInput} />
				</div>
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

SubredditForm.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

export default connect()(SubredditForm);
