import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './cart-slice';
import uiReducer, { UIState } from './ui-slice';

export interface ReducerState {
	cart: CartState;
	ui: UIState;
}

const store = configureStore({
	reducer: { ui: uiReducer, cart: cartReducer },
});

export default store;
