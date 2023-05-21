import { useContext } from 'react';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/CartContext';

interface Item {
	name: string;
	description?: string;
	price: number;
	amount?: number;
	id: string;
}

const MealItem = (props: Item) => {
	const cartCtx = useContext(CartContext);

	const addToCartHandler = (amount: number) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.price,
		});
	};

	return (
		<li className={styles.meal}>
			<div>
				<h3>{props.name}</h3>
				<div className={styles.description}>{props.description}</div>
				<div className={styles.price}>
					{new Intl.NumberFormat('it-IT', {
						style: 'currency',
						currency: 'EUR',
					}).format(props.price)}
				</div>
			</div>
			<div>
				<MealItemForm id={props.id} onAddToCart={addToCartHandler} />
			</div>
		</li>
	);
};

export default MealItem;
