import { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList, { UserAttributes } from './components/Users/UsersList';

function App() {
	const [usersList, setUsersList] = useState<UserAttributes[]>([]);

	const addUserHandler = (uName: string, uAge: number) => {
		setUsersList((prevUsersList): UserAttributes[] => {
			return [
				...prevUsersList,
				{ name: uName, age: uAge, id: Math.random().toString() },
			];
		});
	};
	return (
		<div className='App'>
			<AddUser onAddUser={addUserHandler} />
			<UsersList users={usersList} />
		</div>
	);
}

export default App;
