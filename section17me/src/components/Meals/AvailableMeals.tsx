import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem, { Item } from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';

const url =
	'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/meals.json';

const AvailableMeals = () => {
	const [items, setItems] = useState<Item[]>([]);

	const { isLoading, error, sendRequest: fetchItems } = useHttp();

	useEffect(() => {
		const transformItems = (itemsObj: Item[]) => {
			const loadedItems: Item[] = [];

			for (const itemKey in itemsObj) {
				loadedItems.push({
					id: itemKey,
					name: itemsObj[itemKey].name,
					price: itemsObj[itemKey].price,
					description: itemsObj[itemKey].description,
					amount: 0,
				});
			}
			setItems(loadedItems);
		};

		fetchItems({ url: url }, transformItems);
	}, [fetchItems]);

	const mealsList = items.map((meal: Item) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
			amount={meal.amount}
		/>
	));

	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
