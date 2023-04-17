import { ReactElement } from 'react';

import styles from './Card.module.css';

type PropsType = {
	className: string;
	children: ReactElement | ReactElement[];
};

const Card = ({ className, children }: PropsType): ReactElement => {
	return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export default Card;
