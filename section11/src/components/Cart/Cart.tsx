import { useContext } from 'react';
import CartContext from '../../store/CartContext';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import { Item } from '../Meals/MealItem/MealItem';

interface CartProps {
	onHideCart: () => void;
}

const Cart = (props: CartProps) => {
	const cartCtx = useContext(CartContext);

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
				{hasItems === true && <button className={styles.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
