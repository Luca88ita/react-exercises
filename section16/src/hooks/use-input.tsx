import { FocusEvent, ChangeEvent, useState } from 'react';

const UseInput = (validateValue: (enteredValue: string) => boolean) => {
	const [enteredValue, setEnteredValue] = useState<string>('');
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setEnteredValue(event.target.value.trim());
	};
	const inputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
		setIsTouched(true);
	};
	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default UseInput;
