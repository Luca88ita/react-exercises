import { ReactElement } from 'react';
import { ReducerState } from '../store/index';
import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../store/counter';

const Counter = (): ReactElement => {
	const dispatch = useDispatch();
	const counter = useSelector<ReducerState, number>(
		(state) => state.counter.counter
	);
	const showCounter = useSelector<ReducerState, boolean>(
		(state) => state.counter.showCounter
	);

	const increaseHandler = (): void => {
		dispatch(counterActions.increase(5));
	};
	const incrementHandler = (): void => {
		dispatch(counterActions.increment());
	};
	const decrementHandler = (): void => {
		dispatch(counterActions.decrement());
	};
	const toggleCounterHandler = (): void => {
		dispatch(counterActions.toggleCounter());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{showCounter && <div className={classes.value}>{counter}</div>}
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={decrementHandler}>Decrement</button>
				<button onClick={increaseHandler}>Increase</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;
