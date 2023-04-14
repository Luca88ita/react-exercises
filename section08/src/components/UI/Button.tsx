import { ReactElement } from 'react';
import styles from './Button.module.css';

type PropsType = {
	type?: 'submit' | 'reset' | 'button';
	onClick?: () => void;
	children: ReactElement | ReactElement[] | string;
};

const Button = ({ type, children, onClick }: PropsType) => {
	return (
		<button className={styles.button} type={type || 'button'} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
