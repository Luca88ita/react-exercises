import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

const SimpleInput = () => {
	const [enteredName, setEnteredName] = useState<string>('');
	const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const formIsValid = enteredNameIsValid; // && enteredAgeIsValid && ...

	const nameInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredName(event.target.value);
	};

	const nameInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
		setEnteredNameTouched(true);
	};

	const formSubmissionHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setEnteredNameTouched(true);
		if (!enteredNameIsValid) {
			return;
		}
		setEnteredName('');
		setEnteredNameTouched(false);
	};

	const nameInputClasses = nameInputIsInvalid
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
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
