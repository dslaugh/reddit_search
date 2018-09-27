export const ACTIONS = {
	REQUEST_POSTS: 'REQUEST_POSTS',
	RECEIVE_POSTS: 'RECEIVE_POSTS',
	FETCH_POSTS_FAILED: 'FETCH_POSTS_FAILED',
};

export function requestPosts(subreddit) {
	return {
		type: ACTIONS.REQUEST_POSTS,
		subreddit,
	};
}

export function receivePosts(subreddit, json) {
	return {
		type: ACTIONS.RECEIVE_POSTS,
		subreddit,
		posts: json.data.children.map(child => child.data),
		receivedAt: Date.now(),
	};
}

export function fetchPostsFailed() {
	return {
		type: ACTIONS.FETCH_POSTS_FAILED
	};
}

function getUrl(subreddit, limit=50) {
	return `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`;
}

export function fetchPosts(subreddit, limit=50) {
	return (dispatch) => {
		dispatch(requestPosts(subreddit));

		return fetch(getUrl(subreddit, limit))
			.then((response) => {
				if (response.status === 200) {
					return response.json()
				}
				dispatch(fetchPostsFailed());
				throw new Error('There was an error fetching posts');
			})
			.then((json) => {
				dispatch(receivePosts(subreddit, json));
			});
	}
}
