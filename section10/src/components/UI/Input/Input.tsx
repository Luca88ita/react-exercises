import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import styles from './Input.module.css';

type PropsType = {
	className?: string;
	type: HTMLInputTypeAttribute;
	label: string;
	id: string;
	value?: string;
	isValid?: boolean | null;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => any;
	onBlur?: () => any;
};

const Input = ({
	className,
	isValid,
	type,
	label,
	id,
	value,
	onChange,
	onBlur,
}: PropsType) => {
	return (
		<div
			className={`${styles.control} ${isValid === false ? styles.invalid : ''}`}
		>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</div>
	);
};

export default Input;
