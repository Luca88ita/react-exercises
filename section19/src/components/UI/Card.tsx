import { ReactElement } from 'react';
import classes from './Card.module.css';

interface CardProps {
	children: ReactElement | ReactElement[];
	className?: string;
}

const Card = (props: CardProps) => {
	return (
		<section
			className={`${classes.card} ${props.className ? props.className : ''}`}
		>
			{props.children}
		</section>
	);
};

export default Card;
