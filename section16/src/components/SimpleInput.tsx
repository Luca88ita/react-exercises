import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

function ValidateEmail(inputText: string) {
	const mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
	return inputText.match(mailformat);
}

const SimpleInput = () => {
	const [enteredName, setEnteredName] = useState<string>('');
	const [enteredEmail, setEnteredEmail] = useState<string>('');
	const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);
	const [enteredEmailTouched, setEnteredEmailTouched] =
		useState<boolean>(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const enteredEmailIsValid =
		enteredEmail.trim() !== '' && ValidateEmail(enteredEmail.trim()); // part to change
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	const formIsValid = enteredNameIsValid && enteredEmailIsValid;

	const nameInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredName(event.target.value);
	};
	const emailInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredEmail(event.target.value);
	};

	const nameInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
		setEnteredNameTouched(true);
	};
	const emailInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
		setEnteredEmailTouched(true);
	};

	const formSubmissionHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setEnteredNameTouched(true);
		setEnteredEmailTouched(true);
		if (!enteredNameIsValid || !enteredEmailIsValid) {
			return;
		}
		setEnteredName('');
		setEnteredEmail('');
		setEnteredNameTouched(false);
		setEnteredEmailTouched(false);
	};

	const nameInputClasses = nameInputIsInvalid
		? 'form-control invalid'
		: 'form-control';
	const emailInputClasses = nameInputIsInvalid
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
					value={enteredName}
				/>
				{nameInputIsInvalid && (
					<p className='error-text'>Name must not be empty!</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>Your Email</label>
				<input
					type='email'
					id='email'
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
					value={enteredEmail}
				/>
				{emailInputIsInvalid && (
					<p className='error-text'>Email must not be empty!</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
