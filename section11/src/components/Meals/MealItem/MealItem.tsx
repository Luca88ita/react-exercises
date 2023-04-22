import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

interface MealItemProps {
	name: string;
	description: string;
	price: number;
	id: string;
}

const MealItem = (props: MealItemProps) => {
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
				<MealItemForm id={props.id} />
			</div>
		</li>
	);
};

export default MealItem;
