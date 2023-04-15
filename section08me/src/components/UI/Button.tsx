import { ReactElement } from 'react';
import styles from './Button.module.css';

type PropsType = {
	className?: string;
	type?: 'submit' | 'reset' | 'button';
	onClick?: () => any;
	children: ReactElement | ReactElement[] | string;
};

const Button = ({ className, type, onClick, children }: PropsType) => {
	return (
		<button
			className={`${styles.button} ${className || ''}`}
			type={type || 'button'}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
