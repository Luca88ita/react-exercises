import {
	ChangeEvent,
	FormEvent,
	ReactElement,
	useEffect,
	useState,
} from 'react';

import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';

type PropsType = {
	onLogin: (enteredEmail: string, enteredPassword: string) => any;
};

const Login = ({ onLogin }: PropsType): ReactElement => {
	const [enteredEmail, setEnteredEmail] = useState<string>('');
	const [emailIsValid, setEmailIsValid] = useState<boolean>();
	const [enteredPassword, setEnteredPassword] = useState<string>('');
	const [passwordIsValid, setPasswordIsValid] = useState<boolean>();
	const [formIsValid, setFormIsValid] = useState<boolean>(false);

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(
				enteredEmail.includes('@') && enteredPassword.trim().length > 6
			);
		}, 500); /* we set a timer of 500 seconds after the last click //*/
		return () => {
			clearTimeout(identifier); /* we clean up the old timer with a new one //*/
		}; /* cleanup function which does a cleanup process before the execute effect executes the function the next time //*/
	}, [enteredEmail, enteredPassword]);

	const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredEmail(event.target.value);
	};

	const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredPassword(event.target.value);
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes('@'));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onLogin(enteredEmail, enteredPassword);
	};

	return (
		<Card className={styles.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${styles.control} ${
						emailIsValid === false ? styles.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={enteredEmail}
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

export default Login;
