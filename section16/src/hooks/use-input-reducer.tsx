import { FocusEvent, ChangeEvent, useReducer } from 'react';

interface Action {
	type: 'INPUT' | 'BLUR' | 'RESET';
	value?: string;
}

interface State {
	value: string;
	isTouched: boolean;
}

const initalInputState: State = {
	value: '',
	isTouched: false,
};

const inputStateReducer = (state: State, action: Action): State => {
	if (action.type === 'INPUT' && action.value) {
		return { value: action.value, isTouched: state.isTouched };
	}
	if (action.type === 'BLUR') {
		return { value: state.value, isTouched: true };
	}
	if (action.type === 'RESET') {
		return { value: '', isTouched: false };
	}
	return initalInputState;
};

const useInputReducer = (validateValue: (enteredValue: string) => boolean) => {
	const [inputState, dispatch] = useReducer(
		inputStateReducer,
		initalInputState
	);

	const valueIsValid = validateValue(inputState.value);
	const hasError = !valueIsValid && inputState.isTouched;

	const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'INPUT', value: event.target.value });
	};
	const inputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
		dispatch({ type: 'BLUR' });
	};
	const reset = () => {
		dispatch({ type: 'RESET' });
	};

	return {
		value: inputState.value,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInputReducer;
