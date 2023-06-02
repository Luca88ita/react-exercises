import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem, { Item } from './MealItem/MealItem';

const AvailableMeals = () => {
	const [meals, setMeals] = useState<Item[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [httpError, setHttpError] = useState<boolean | string>();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
			);

			if (!response.ok) {
				throw new Error('Something went wrong|');
			}

			const responseData = await response.json();

			const loadedMeals: Item[] = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
					amount: 0,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={styles.MealsLoading}>
				<p> Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={styles.MealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
			amount={0}
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
