import { createStore } from 'redux';
//const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
	switch (action.type) {
		case 'CURRENT':
			return {
				counter: state.counter,
			};
		case 'INCREMENT':
			return {
				counter: state.counter + 1,
			};
		case 'DECREMENT':
			return {
				counter: state.counter - 1,
			};
		default:
			break;
	}
	return state;
};

const store = createStore(counterReducer);

const counterSubscriber = () => {
	const latestState = store.getState();
	console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'CURRENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
