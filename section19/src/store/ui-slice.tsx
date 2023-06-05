import { createSlice } from '@reduxjs/toolkit';

export interface UIState {
	showCart: boolean;
}

const initialUIState: UIState = {
	showCart: false,
};

const uiSlice = createSlice({
	name: 'cart',
	initialState: initialUIState,
	reducers: {
		toggleCart(state) {
			state.showCart = !state.showCart;
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
