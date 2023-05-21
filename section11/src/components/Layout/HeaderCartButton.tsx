import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/CartContext';

interface Props {
	onShowCart: () => void;
}
interface Item {
	name: string;
	description?: string;
	price: number;
	amount: number;
	id: string;
}
const HeaderCartButton = (props: Props) => {
	const [btinIsHighlighted, setBtinIsHighlighted] = useState(false);
	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	const numberOfCartItems = items.reduce((currentNumber, item: Item) => {
		return currentNumber + item.amount;
	}, 0);

	const btnClasses = `${styles.button} ${btinIsHighlighted ? styles.bump : ''}`;

	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}
		setBtinIsHighlighted(true);
		const timer = setTimeout(() => {
			setBtinIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartCtx.items.length, items]);
	return (
		<button className={btnClasses} onClick={props.onShowCart}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span> Your Cart</span>
			<span className={styles.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
