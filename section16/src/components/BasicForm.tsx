import { FormEvent } from 'react';
//import UseInput from '../hooks/use-input';
import useInputReducer from '../hooks/use-input-reducer';

const validateName = (inputText: string): boolean => {
	return inputText.trim() !== '';
};

const validateEmail = (inputText: string): boolean => {
	const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
	return inputText.trim().match(mailformat) ? true : false;
};

const BasicForm = () => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangedHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInputReducer((value) => validateName(value));
	const {
		value: enteredSurname,
		isValid: enteredSurnameIsValid,
		hasError: surnameInputHasError,
		valueChangeHandler: surnameChangedHandler,
		inputBlurHandler: surnameBlurHandler,
		reset: resetSurnameInput,
	} = useInputReducer((value) => validateName(value));
	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangedHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
	} = useInputReducer((value) => validateEmail(value));

	let formIsValid = false;
	if (enteredNameIsValid && enteredSurnameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const formSubmissionHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!formIsValid) {
			return;
		}
		console.log(enteredName + ' ' + enteredSurname + ' ' + enteredEmail);

		resetSurnameInput();
		resetNameInput();
		resetEmailInput();
	};

	const nameInputClasses = nameInputHasError
		? 'form-control invalid'
		: 'form-control';
	const surnameInputClasses = surnameInputHasError
		? 'form-control invalid'
		: 'form-control';
	const emailInputClasses = emailInputHasError
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='control-group'>
				<div className={nameInputClasses}>
					<label htmlFor='name'>First Name</label>
					<input
						type='text'
						id='name'
						onChange={nameChangedHandler}
						onBlur={nameBlurHandler}
						value={enteredName}
					/>
					{nameInputHasError && (
						<p className='error-text'>The First Name must not be empty!</p>
					)}
				</div>
				<div className={surnameInputClasses}>
					<label htmlFor='surname'>Last Name</label>
					<input
						type='text'
						id='surname'
						onChange={surnameChangedHandler}
						onBlur={surnameBlurHandler}
						value={enteredSurname}
					/>
					{surnameInputHasError && (
						<p className='error-text'>The Last Name must not be empty!</p>
					)}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>Email address</label>
				<input
					type='email'
					id='email'
					onChange={emailChangedHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{emailInputHasError && (
					<p className='error-text'>
						Email must have a valid format (eg. abc@abc.com)!
					</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
