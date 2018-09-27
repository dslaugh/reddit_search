import {
	ACTIONS,
	requestPosts,
	receivePosts,
	fetchPosts, fetchPostsFailed,
} from '../actions';

const mockJsonData = {
	data: {
		children: [
			{ data: 'This is test data 1' },
			{ data: 'This is test data 2' },
			{ data: 'This is test data 3' },
		]
	}
};

describe('Actions', () => {
	test('REQUEST_POSTS should be "REQUEST_POSTS"', () => {
		expect(ACTIONS.REQUEST_POSTS).toBe('REQUEST_POSTS');
	});

	test('RECEIVE_POSTS should be "RECEIVE_POSTS"', () => {
		expect(ACTIONS.RECEIVE_POSTS).toBe('RECEIVE_POSTS');
	});

	test('FETCH_POSTS_FAILED should be "FETCH_POSTS_FAILED"', () => {
		expect(ACTIONS.FETCH_POSTS_FAILED).toBe('FETCH_POSTS_FAILED');
	});
});

describe('Action Creators', () => {
	describe('#requestPosts', () => {
		test('It should return the correct action', () => {
			const expected = {
				type: ACTIONS.REQUEST_POSTS,
				subreddit: 'reactjs',
			};
			const actual = requestPosts('reactjs');
			expect(actual).toEqual(expected);
		});
	});

	describe('#receivePosts', () => {
		test('It should return the correct action', () => {
			const expectedPosts = [
				'This is test data 1',
				'This is test data 2',
				'This is test data 3',
			];
			const actual = receivePosts('reactjs', mockJsonData);

			expect(actual).toMatchObject({
				type: 'RECEIVE_POSTS',
				subreddit: 'reactjs',
				posts: expectedPosts,
				receivedAt: expect.any(Number),
			});
		});
	});

	describe('#fetchPostsFailed', () => {
		const expected = { type: 'FETCH_POSTS_FAILED' };
		const actual = fetchPostsFailed();
		expect(actual).toEqual(expected);
	});

	describe('#fetchPosts', () => {
		test('It should dispatch requestPosts and receivePosts with the correct args', async () => {
			const dispatch = jest.fn();
			fetch = jest.fn().mockImplementation(() => {
				return Promise.resolve({
					status: 200,
					json: () => mockJsonData,
				});
			});

			await fetchPosts('reactjs')(dispatch);

			const requestPostArgs = {
				type: 'REQUEST_POSTS',
				subreddit: 'reactjs',
			};
			const receivePostArgs = {
				type: 'RECEIVE_POSTS',
				subreddit: 'reactjs',
				posts: [
					'This is test data 1',
					'This is test data 2',
					'This is test data 3',
				],
				receivedAt: expect.any(Number),
			};
			expect(dispatch).toHaveBeenCalledWith(requestPostArgs);
			expect(dispatch).toHaveBeenCalledWith(receivePostArgs);
		});
	});

	test('It should dispatch fetchPostsFailed if fetching posts is not successful', async () => {
		const dispatch = jest.fn();
		fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({
				status: 400,
			});
		});
		const requestPostArgs = {
			type: 'REQUEST_POSTS',
			subreddit: 'reactjs',
		};

		await expect(fetchPosts('reactjs')(dispatch))
			.rejects
			.toEqual(new Error('There was an error fetching posts'));
		expect(dispatch).toHaveBeenCalledWith(requestPostArgs);
	});

});