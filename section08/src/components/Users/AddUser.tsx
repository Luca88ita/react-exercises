import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card';

type PropsType = {
	onAddUser: (enteredUsername: string, enteredAge: number) => void;
};

type ErrorType = {
	title: string;
	message: string;
};

const AddUser = ({ onAddUser }: PropsType) => {
	const [enteredUsername, setEnteredUsername] = useState<string>('');
	const [enteredAge, setEnteredAge] = useState<number>(0);
	const [error, setError] = useState<ErrorType | null>();

	const addUserHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			enteredUsername.trim().length === 0 ||
			enteredAge.toString.length === 0
		) {
			setError({
				title: 'Invalid input',
				message: 'Please enter a valid name and age (non-empty values).',
			});
			return;
		}
		if (enteredAge < 1) {
			setError({
				title: 'Invalid age',
				message: 'Please enter a valid age (> 0).',
			});
			return;
		}
		onAddUser(enteredUsername, enteredAge);
		setEnteredUsername('');
		setEnteredAge(0);
	};

	const usernameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredUsername(event.target.value);
	};

	const ageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredAge(+event.target.value);
	};

	const errorHandler = () => {
		setError(null);
	};

	const content = (
		<div className={styles.input}>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						name='username'
						id='username'
						value={enteredUsername}
						onChange={usernameChangeHandler}
					/>
					<label htmlFor='age'>Age (Year)</label>
					<input
						type='number'
						name='age'
						id='age'
						value={enteredAge}
						onChange={ageChangeHandler}
					/>
					<Button type='submit'>Add User</Button>
				</form>
			</Card>
		</div>
	);

	return content;
};

export default AddUser;
