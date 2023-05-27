import { FormEvent, useRef } from 'react';

import classes from './TaskForm.module.css';

interface Props {
	onEnterTask: (enteredValue: string) => void;
	loading: boolean;
}

const TaskForm = (props: Props) => {
	const taskInputRef = useRef<HTMLInputElement | null>(null);

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (taskInputRef.current) {
			const enteredValue = taskInputRef.current.value;
			if (enteredValue.trim().length > 0) {
				props.onEnterTask(enteredValue);
			}
		}
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<input type='text' ref={taskInputRef} />
			<button>{props.loading ? 'Sending...' : 'Add Task'}</button>
		</form>
	);
};

export default TaskForm;
