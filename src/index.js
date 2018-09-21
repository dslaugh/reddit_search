import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App';
import { rootReducer } from './reducers';

const logger = store => next => action => {
	console.log('Dispatching ', action );
	return Promise.resolve(next(action));
};

const store = createStore(
	rootReducer,
	applyMiddleware(logger, thunkMiddleware)
);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('root')
);
