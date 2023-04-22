import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

interface MealItemFormProps {
	id: string;
}

const MealItemForm = (props: MealItemFormProps) => {
	return (
		<form className={styles.form}>
			<Input
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
		</form>
	);
};

export default MealItemForm;
