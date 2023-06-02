import { FormEvent, useRef, useState } from 'react';
import styles from './Checkout.module.css';

interface CheckoutProps {
	onCancel: () => void;
	onConfirm: (userData: FormInput) => void;
}

interface FormInputValidity {
	name: boolean;
	street: boolean;
	city: boolean;
	postalCode: boolean;
}
export interface FormInput {
	name: string;
	street: string;
	city: string;
	postalCode: string;
}

const isEmpty = (value: string) => value.trim() === '';
const isFiveChars = (value: string) => value.trim().length === 5;

const Checkout = (props: CheckoutProps) => {
	const [formInputsValidity, setFormInputsValidity] =
		useState<FormInputValidity>({
			name: true,
			street: true,
			city: true,
			postalCode: true,
		});
	const nameInputRef = useRef<HTMLInputElement>(null);
	const streetInputRef = useRef<HTMLInputElement>(null);
	const postalCodeInputRef = useRef<HTMLInputElement>(null);
	const cityInputRef = useRef<HTMLInputElement>(null);

	const confirmHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			nameInputRef.current &&
			streetInputRef.current &&
			postalCodeInputRef.current &&
			cityInputRef.current
		) {
			const enteredName = nameInputRef.current.value;
			const enteredStreet = streetInputRef.current.value;
			const enteredPostalCode = postalCodeInputRef.current.value;
			const enteredCity = cityInputRef.current.value;

			const enteredNameIsValid = !isEmpty(enteredName);
			const enteredStreetIsValid = !isEmpty(enteredStreet);
			const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
			const enteredCityIsValid = !isEmpty(enteredCity);

			setFormInputsValidity({
				name: enteredNameIsValid,
				street: enteredStreetIsValid,
				city: enteredCityIsValid,
				postalCode: enteredPostalCodeIsValid,
			});

			const formIsValid =
				enteredNameIsValid &&
				enteredStreetIsValid &&
				enteredPostalCodeIsValid &&
				enteredCityIsValid;

			if (!formIsValid) {
				return;
			}

			props.onConfirm({
				name: enteredName,
				street: enteredStreet,
				city: enteredCity,
				postalCode: enteredPostalCode,
			});
		}
	};

	const nameControlStyles = `${styles.control} ${
		formInputsValidity.name ? '' : styles.invalid
	}`;
	const streetControlStyles = `${styles.control} ${
		formInputsValidity.street ? '' : styles.invalid
	}`;
	const postalCodeControlStyles = `${styles.control} ${
		formInputsValidity.postalCode ? '' : styles.invalid
	}`;
	const cityControlStyles = `${styles.control} ${
		formInputsValidity.city ? '' : styles.invalid
	}`;

	return (
		<form className={styles.form} onSubmit={confirmHandler}>
			<div className={nameControlStyles}>
				<label htmlFor='name'>Your Name</label>
				<input ref={nameInputRef} type='text' id='name' />
				{!formInputsValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlStyles}>
				<label htmlFor='street'>Street</label>
				<input ref={streetInputRef} type='text' id='street' />
				{!formInputsValidity.street && <p>Please enter a valid street!</p>}
			</div>
			<div className={postalCodeControlStyles}>
				<label htmlFor='postal'>Postal Code</label>
				<input ref={postalCodeInputRef} type='text' id='postal' />
				{!formInputsValidity.postalCode && (
					<p>Please enter a valid postal code!</p>
				)}
			</div>
			<div className={cityControlStyles}>
				<label htmlFor='city'>City</label>
				<input ref={cityInputRef} type='text' id='city' />
				{!formInputsValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={styles.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button type='submit' className={styles.submit}>
					Confirm
				</button>
			</div>
		</form>
	);
};

export default Checkout;
