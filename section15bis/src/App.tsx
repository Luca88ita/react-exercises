import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

interface Task {
	id: string;
	text: string;
}

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [tasks, setTasks] = useState<Task[]>([]);

	const fetchTasks = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
			);

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			const loadedTasks: Task[] = [];

			for (const taskKey in data) {
				loadedTasks.push({ id: taskKey, text: data[taskKey].text });
			}

			setTasks(loadedTasks);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Something went wrong!');
			}
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const taskAddHandler = (task: Task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
