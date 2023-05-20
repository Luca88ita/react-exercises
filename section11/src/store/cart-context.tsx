/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

interface Item {
	name: string;
	description?: string;
	price: number;
	amount: number;
	id: string;
}

const CartContext = createContext({
	items: [],
	totalAmount: 0,
	addItem: (item: Item): void => {},
	removeItem: (id: string): void => {},
});

export default CartContext;
