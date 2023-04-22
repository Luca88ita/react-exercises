import Modal from '../UI/Modal';
import styles from './Cart.module.css';

interface CartProps {
	onHideCart: () => void;
}

const Cart = (props: CartProps) => {
	const cartItems = (
		<ul className={styles['cart-items']}>
			{[{ id: 'c1', name: 'sushi', amount: 2, price: 12.99 }].map((item) => (
				<li key={item.id}>
					<div>{item.name}</div>
					<div>{item.amount}</div>
					<div>{item.price}</div>
				</li>
			))}
		</ul>
	);

	return (
		<Modal onHideCart={props.onHideCart}>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>35.62</span>
			</div>
			<div className={styles.actions}>
				<button className={styles['button--alt']} onClick={props.onHideCart}>
					Close
				</button>
				<button className={styles.button}>Order</button>
			</div>
		</Modal>
	);
};

export default Cart;
