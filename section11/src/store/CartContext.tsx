/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react';
import { Item } from '../components/Meals/MealItem/MealItem';

interface ContextProps {
	readonly items: Item[];
	readonly totalAmount: number;
	readonly addItem: (item: Item) => void;
	readonly removeItem: (id: string) => void;
}

const CartContext = createContext<ContextProps>({
	items: [],
	totalAmount: 0,
	addItem: () => {},
	removeItem: () => {},
});

export default CartContext;
