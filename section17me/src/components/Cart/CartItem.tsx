import styles from './CartItem.module.css';

interface Props {
	price: number;
	name: string;
	amount: number;
	onRemove: () => void;
	onAdd: () => void;
}

const CartItem = (props: Props) => {
	const price = Intl.NumberFormat('it-IT', {
		style: 'currency',
		currency: 'EUR',
	}).format(props.price);

	return (
		<li className={styles['cart-item']}>
			<div>
				<h2>{props.name}</h2>
				<div className={styles.summary}>
					<span className={styles.price}>{price}</span>
					<span className={styles.amount}>x {props.amount}</span>
				</div>
			</div>
			<div className={styles.actions}>
				<button onClick={props.onRemove}>-</button>
				<button onClick={props.onAdd}>+</button>
			</div>
		</li>
	);
};

export default CartItem;
