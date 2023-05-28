import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';
import { Task } from '../../App';

interface Props {
	onAddTask: (createdTask: Task) => void;
}
/*interface TaskData {
	name: string;
}*/

const NewTask = (props: Props) => {
	const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

	const createTask = (taskText: string, taskData: any) => {
		console.log(taskData);
		const generatedId: string = taskData.name; // firebase-specific => "name" contains generated id
		const createdTask: Task = { id: generatedId, text: taskText };

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText: string) => {
		const url =
			'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';

		sendTaskRequest(
			{
				url: url,
				other: {
					method: 'POST',
					body: { text: taskText },
					headers: { 'Content-Type': 'application/json' },
				},
			},
			createTask.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			<>{error && <p>{error}</p>}</>
		</Section>
	);
};

export default NewTask;
