import {
	ChangeEvent,
	FormEvent,
	ReactElement,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';

import Card from '../UI/Card/Card';
import styles from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

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

const passwordReducer = (
	state: ReducerStateType,
	action: ReducerActionTpe
): ReducerStateType => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
};

const Login2 = (): ReactElement => {
	const ctx = useContext(AuthContext);

	const [formIsValid, setFormIsValid] = useState<boolean | null>(null);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500); /* we set a timer of 500 seconds after the last click //*/
		return () => {
			clearTimeout(identifier); /* we clean up the old timer with a new one //*/
		}; /* cleanup function which does a cleanup process before the execute effect executes the function the next time //*/
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

		setFormIsValid(
			event.target.value.includes('@') && passwordState.isValid === true
		);
	};

	const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

		setFormIsValid(
			emailState.isValid === true && event.target.value.trim().length > 6
		);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR', val: emailState.value });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR', val: passwordState.value });
	};

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		ctx.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={styles.login}>
			<form onSubmit={submitHandler}>
				<Input
					type={'email'}
					label={'E-Mail'}
					id={'email'}
					value={emailState.value}
					isValid={emailState.isValid}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					type={'password'}
					label={'Password'}
					id={'password'}
					value={passwordState.value}
					isValid={passwordState.isValid}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
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
