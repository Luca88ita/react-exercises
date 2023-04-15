import Button from '../UI/Button';
import styles from './AddUser.module.css';
import Card from '../UI/Card';
import { ChangeEvent, FormEvent, useState } from 'react';
import ErrorModal, { ErrorMessage } from '../UI/ErrorModal';

export type User = {
	username: string;
	age: number;
};

type PropsType = {
	addUser: (user: User) => void;
};

const AddUser = ({ addUser }: PropsType) => {
	const [username, setUsername] = useState<string>('');
	const [age, setAge] = useState<number>(0);
	const [error, setError] = useState<ErrorMessage | null>(null);

	const closeError = () => {
		setError(null);
	};

	const addUserHandler = (e: FormEvent<HTMLFormElement>) => {
		//prevengo la ricarica della pagina quando premo un pulsante di tipo submit
		e.preventDefault();
		// verifico che username ed età siano stati inizializzati
		if (username.trim().length === 0 || age === 0) {
			setError({
				title: 'Invalid username and age',
				message: 'Username and age must be fulfilled',
				onConfirm: closeError,
			});
			return;
		}
		if (age <= 0) {
			setError({
				title: 'Invalid age',
				message: 'Age must be > 0',
				onConfirm: closeError,
			});
			return;
		}
		setError(null);
		setAge(0);
		setUsername('');
		addUser({ username, age });
	};

	const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};
	const ageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setAge(+e.target.value);
	};

	const content = (
		<div className={styles.addUser}>
			{error && <ErrorModal error={error} />}
			<Card className={styles.addUser}>
				<form onSubmit={addUserHandler}>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						value={username}
						id='username'
						name='username'
						placeholder='Insert username'
						onChange={usernameChangeHandler}
					/>
					<label htmlFor='age'>Age (Years)</label>
					<input
						type='number'
						value={age}
						id='age'
						name='age'
						placeholder='Insert age'
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
