import { ReactElement } from 'react';
import classes from './Section.module.css';

interface Props {
	children?: ReactElement | ReactElement[];
}

const Section = (props: Props) => {
	return <section className={classes.section}>{props.children}</section>;
};

export default Section;
