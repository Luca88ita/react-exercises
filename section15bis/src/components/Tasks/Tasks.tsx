import { ReactElement } from 'react';
import Section from '../UI/Section';
import TaskItem from './TaskItem';
import classes from './Tasks.module.css';
import { Task } from '../../App';
import { RequestConfig } from '../../hooks/use-http';

interface Props {
	items: Task[];
	error: string | null;
	onFetch: (
		requestConfig: RequestConfig,
		applyData: (data: Task[]) => void
	) => Promise<void>;
	loading: boolean;
}

const Tasks = (props: Props) => {
	let taskList = <h2>No tasks found. Start adding some!</h2>;

	if (props.items.length > 0) {
		taskList = (
			<ul>
				{props.items.map((task: Task) => (
					<TaskItem key={task.id}>{task.text}</TaskItem>
				))}
			</ul>
		);
	}

	let content: ReactElement | ReactElement[] | string = taskList;

	if (props.error) {
		content = (
			<button
				onClick={() => {
					props.onFetch;
				}}
			>
				Try again
			</button>
		);
	}

	if (props.loading) {
		content = 'Loading tasks...';
	}

	return (
		<Section>
			<div className={classes.container}>{content}</div>
		</Section>
	);
};

export default Tasks;
