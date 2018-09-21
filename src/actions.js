export const ACTIONS = {
	REQUEST_POSTS: 'REQUEST_POSTS',
	RECEIVE_POSTS: 'RECEIVE_POSTS',
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

function getUrl(subreddit, limit=50) {
	return `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`;
}

export function fetchPosts(subreddit) {
	return (dispatch) => {
		dispatch(requestPosts(subreddit));
		return fetch(getUrl(subreddit))
			.then((response) => {
				if (response.status === 200) {
					return response.json()
				}
				throw new Error('There was an error from fetching posts');
			})
			.then((json) => {
				dispatch(receivePosts(subreddit, json));
			})
			.catch((err) => {
				console.error('There was an error', err);
			});
	}
}
