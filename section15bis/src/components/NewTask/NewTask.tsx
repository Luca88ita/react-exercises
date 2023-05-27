import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

interface Task {
	id: string;
	text: string;
}

interface Props {
	onAddTask: (createdTask: Task) => void;
}

const NewTask = (props: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const enterTaskHandler = async (taskText: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
				{
					method: 'POST',
					body: JSON.stringify({ text: taskText }),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			const generatedId = data.name; // firebase-specific => "name" contains generated id
			const createdTask = { id: generatedId, text: taskText };

			props.onAddTask(createdTask);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Something went wrong!');
			}
		}
		setIsLoading(false);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			<>{error && <p>{error}</p>}</>
		</Section>
	);
};

export default NewTask;
