import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from "../actions";

const SubredditForm = ({ dispatch }) => {
	let textInput = React.createRef();

	function handleFormSubmit(e) {
		e.preventDefault();
		let inputValue = textInput.current.value.trim();
		if (inputValue === '') {
			return;
		}
		dispatch(fetchPosts(inputValue));
	}

	return (
		<div id="subredditFormContainer">
			<form id="subredditForm" onSubmit={handleFormSubmit}>
				<input type="text" ref={textInput} placeholder="Enter subreddit" />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

SubredditForm.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

export default connect()(SubredditForm);
