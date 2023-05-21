import { FormEvent, useRef, useState } from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

interface MealItemFormProps {
	id: string;
	onAddToCart: (enteredAmountNumber: number) => void;
}

const MealItemForm = (props: MealItemFormProps) => {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef<HTMLInputElement | null>(null);

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!amountInputRef.current) throw Error('amountInputRef is not assigned');
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setAmountIsValid(false);
			return;
		}

		props.onAddToCart(enteredAmountNumber);
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label='Amount'
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
		</form>
	);
};

export default MealItemForm;
