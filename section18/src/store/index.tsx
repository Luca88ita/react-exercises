import { configureStore } from '@reduxjs/toolkit';
import counterReducer, { CounterState } from './counter';
import authReducer, { AuthState } from './auth';

export interface ReducerState {
	counter: CounterState;
	auth: AuthState;
}

const store = configureStore({
	reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
