/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react';
import { Item } from '../components/Meals/MealItem/MealItem';

export interface ContextProps {
	readonly items: Item[];
	readonly totalAmount: number;
	readonly addItem: (item: Item) => void;
	readonly removeItem: (id: string) => void;
	readonly resetCart: () => void;
}

const CartContext = createContext<ContextProps>({
	items: [],
	totalAmount: 0,
	addItem: () => {},
	removeItem: () => {},
	resetCart: () => {},
});

export default CartContext;
