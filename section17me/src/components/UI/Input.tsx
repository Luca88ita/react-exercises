import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps {
	className?: string;
	label: string;
	input: InputHTMLAttributes<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement | null, InputProps>((props, ref) => {
	return (
		<div className={`${styles.input} ${props.className || ''}`}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
	);
});

export default Input;
