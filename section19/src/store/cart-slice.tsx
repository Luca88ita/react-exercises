import { createSlice } from '@reduxjs/toolkit';
import { CartItemInterface } from '../components/Cart/CartItem';

export interface CartState {
	items: CartItemInterface[];
	totalQuantity: number;
}

const initialCartState: CartState = {
	items: [],
	totalQuantity: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialCartState,
	reducers: {
		addItemToCart(state, action) {
			const newItem: CartItemInterface = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity++;
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					total: newItem.price,
					title: newItem.title,
				});
			} else {
				existingItem.quantity = existingItem.quantity + 1;
				existingItem.total = existingItem.total + newItem.price;
			}
		},
		removeItemToCart(state, action) {
			const id: string = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.totalQuantity--;
			if (existingItem?.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				if (existingItem) {
					existingItem.quantity = existingItem.quantity - 1;
					existingItem.total = existingItem.total - existingItem.price;
				}
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
