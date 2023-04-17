import React, { ReactElement } from 'react';

import styles from './Button.module.css';

type PropsType = {
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	onClick?: () => any;
	disabled?: boolean;
	children: ReactElement | ReactElement[] | string;
};

const Button = ({
	type,
	className,
	onClick,
	disabled,
	children,
}: PropsType): ReactElement => {
	return (
		<button
			type={type || 'button'}
			className={`${styles.button} ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
