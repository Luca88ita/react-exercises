import { useContext, useState } from 'react';
import CartContext from '../../store/CartContext';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import { Item } from '../Meals/MealItem/MealItem';
import useHttp from '../../hooks/use-http';

const url =
	'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/orders.json';

interface CartProps {
	onHideCart: () => void;
}
interface Order {
	id: string;
	items: Item[];
}

const Cart = (props: CartProps) => {
	const cartCtx = useContext(CartContext);
	const [order, setOrder] = useState<Order>();
	const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();

	const placeOrderHandler = (createdOrder: Order) => {
		setOrder(createdOrder);
	};

	const createOrder = (orderItems: Item[], itemData: any) => {
		const generatedId: string = itemData.name; // firebase-specific => "name" contains generated id
		const createdOrder: Order = { id: generatedId, items: orderItems };

		placeOrderHandler(createdOrder);
	};

	const enterOrderHandler = async (orderItems: Item[]) => {
		sendOrderRequest(
			{
				url: url,
				other: {
					method: 'POST',
					body: orderItems,
					headers: { 'Content-Type': 'application/json' },
				},
			},
			createOrder.bind(null, orderItems)
		);
	};

	const totalAmount = Intl.NumberFormat('it-IT', {
		style: 'currency',
		currency: 'EUR',
	}).format(cartCtx.totalAmount);

	const hasItems = cartCtx.items.length > 0;

	const cartItemsRemoveHandler = (id: string) => {
		cartCtx.removeItem(id);
	};
	const cartItemsAddHandler = (item: Item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItems = (
		<ul className={styles['cart-items']}>
			{cartCtx.items.map((item: Item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemsRemoveHandler.bind(null, item.id)}
					onAdd={cartItemsAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onHideCart={props.onHideCart}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button className={styles['button--alt']} onClick={props.onHideCart}>
					Close
				</button>
				{hasItems === true && (
					<button
						className={styles.button}
						onClick={() => {
							enterOrderHandler(
								cartCtx.items.map((item: Item) => ({
									id: item.id,
									name: item.name,
									amount: item.amount,
									price: item.price,
								}))
							);
							cartCtx.resetCart();
							props.onHideCart;
						}}
					>
						Order
					</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
