import { ReactElement } from 'react';
import classes from './Card.module.css';

interface Props {
	children?: ReactElement | ReactElement[] | number;
}

const Card = (props: Props): ReactElement => {
	return <div className={classes.card}>{props.children}</div>;
};

export default Card;
