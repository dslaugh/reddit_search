import { ACTIONS } from './actions';

export function rootReducer(state = { posts: [], subreddit: '', isFetching: false }, action) {
	switch (action.type) {
		case ACTIONS.REQUEST_POSTS:
			return Object.assign({}, state, {
				subreddit: action.subreddit,
				isFetching: true,
			});
		case ACTIONS.RECEIVE_POSTS:
			return Object.assign({}, state, {
				posts: action.posts,
				subreddit: action.subreddit,
				isFetching: false,
			});
		default:
			return state;
	}
}
