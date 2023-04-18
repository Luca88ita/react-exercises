import {
	ChangeEvent,
	FormEvent,
	ReactElement,
	useReducer,
	useState,
} from 'react';

import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';

type PropsType = {
	onLogin: (enteredEmail: string, enteredPassword: string) => any;
};

type ReducerStateType = {
	value: string;
	isValid: boolean | null;
};
type ReducerActionTpe = {
	type: 'USER_INPUT' | 'INPUT_BLUR';
	val: string;
};

const emailReducer = (
	state: ReducerStateType,
	action: ReducerActionTpe
): ReducerStateType => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}
	return { value: '', isValid: false };
};

const Login2 = ({ onLogin }: PropsType): ReactElement => {
	const [enteredPassword, setEnteredPassword] = useState<string>('');
	const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
	const [formIsValid, setFormIsValid] = useState<boolean>(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

		setFormIsValid(
			event.target.value.includes('@') && enteredPassword.trim().length > 6
		);
	};

	const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredPassword(event.target.value);
		setFormIsValid(
			emailState.isValid === true && enteredPassword.trim().length > 6
		);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR', val: emailState.value });
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onLogin(emailState.value, enteredPassword);
	};

	return (
		<Card className={styles.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${styles.control} ${
						emailState.isValid === false ? styles.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${styles.control} ${
						passwordIsValid === false ? styles.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={enteredPassword}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={styles.actions}>
					<Button type='submit' className={styles.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login2;
