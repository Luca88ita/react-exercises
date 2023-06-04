import classes from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { FormEvent, useRef } from 'react';

const Auth = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const pwRef = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();

	const loginHandler = (event: FormEvent): void => {
		event.preventDefault();
		if (emailRef.current && pwRef.current) {
			if (
				emailRef.current.value === 'ciao@ciao.com' &&
				pwRef.current.value === 'ciao'
			) {
				dispatch(authActions.login());
			}
		}
	};

	const content = (
		<main className={classes.auth}>
			<section>
				<form onSubmit={loginHandler}>
					<div className={classes.control}>
						<label htmlFor='email'>Email</label>
						<input ref={emailRef} type='email' id='email' />
					</div>
					<div className={classes.control}>
						<label htmlFor='password'>Password</label>
						<input ref={pwRef} type='password' id='password' />
					</div>
					<button type='submit'>Login</button>
				</form>
			</section>
		</main>
	);

	return content;
};

export default Auth;
