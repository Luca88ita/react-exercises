import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps {
	className?: string;
	label: string;
	input: InputHTMLAttributes<HTMLInputElement>;
}

const Input = ({ className, label, input }: InputProps) => {
	return (
		<div className={`${styles.input} ${className || ''}`}>
			<label htmlFor={input.id}>{label}</label>
			<input {...input} />
		</div>
	);
};

export default Input;
