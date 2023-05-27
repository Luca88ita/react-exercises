import { ReactElement } from 'react';
import classes from './TaskItem.module.css';

interface Props {
	children?: ReactElement | ReactElement[] | string;
}

const TaskItem = (props: Props) => {
	return <li className={classes.task}>{props.children}</li>;
};

export default TaskItem;
