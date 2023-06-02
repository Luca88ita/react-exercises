/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react';
import { Item } from '../components/Meals/MealItem/MealItem';

interface ContextProps {
	readonly items: Item[];
	readonly totalAmount: number;
	readonly addItem: (item: Item) => void;
	readonly removeItem: (id: string) => void;
	readonly clearCart: () => void;
}

const CartContext = createContext<ContextProps>({
	items: [],
	totalAmount: 0,
	addItem: () => {},
	removeItem: () => {},
	clearCart: () => {},
});

export default CartContext;
