import { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

export interface Task {
	id: string;
	text: string;
}

const url =
	'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';

function App() {
	const [tasks, setTasks] = useState<Task[]>([]);

	const { isLoading, error, sendRequest: fetchTasks } = useHttp();

	useEffect(() => {
		const transformTasks = (tasksObj: Task[]) => {
			//console.log(tasksObj);

			const loadedTasks: Task[] = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
			}

			setTasks(loadedTasks);
		};

		fetchTasks({ url: url }, transformTasks);
	}, [fetchTasks]);

	const taskAddHandler = (task: Task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</>
	);
}

export default App;
