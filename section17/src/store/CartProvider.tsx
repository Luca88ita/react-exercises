import { ReactElement, useReducer } from 'react';
import CartContext from './CartContext';
import { Item } from '../components/Meals/MealItem/MealItem';

interface CartProviderProps {
	children?: ReactElement | ReactElement[];
}

interface CartState {
	items: Item[];
	totalAmount: number;
}
interface CartAction {
	item?: Item;
	id?: string;
	type: 'ADD' | 'REMOVE' | 'CLEAR';
}

const defaultCartState: CartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction) => {
	if (action.type === 'ADD') {
		if (action.item) {
			const updatedTotalAmount =
				state.totalAmount + action.item.price * action.item.amount;
			const existingCartItemIndex = state.items.findIndex(
				(item) => action.item && item.id === action.item.id
			);

			const existingCartItem = state.items[existingCartItemIndex];

			let updatedItems;

			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount,
				};
				updatedItems = [...state.items];
				updatedItems[existingCartItemIndex] = updatedItem;
			} else {
				updatedItems = state.items.concat(action.item);
			}
			return {
				items: updatedItems,
				totalAmount: updatedTotalAmount,
			};
		}
	}
	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingCartItem.price;

		let updatedItems;

		if (existingCartItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	if (action.type === 'CLEAR') {
		return defaultCartState;
	}
	return defaultCartState;
};

const CartProvider = (props: CartProviderProps) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItemToCartHandler = (item: Item) => {
		dispatchCartAction({ type: 'ADD', item: item });
	};
	const removeItemFromCartHandler = (id: string) => {
		dispatchCartAction({ type: 'REMOVE', id: id });
	};
	const clearCartHandler = () => {
		dispatchCartAction({ type: 'CLEAR' });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
