import { useState } from 'react';
import AddUser, { User } from './components/Users/AddUser';
import UserList from './components/Users/UserList';

const App = () => {
	const [users, setUsers] = useState<User[]>([]);

	const addUserHandler = (user: User) => {
		setUsers((prevUsers) => {
			return [user, ...prevUsers];
		});
	};

	return (
		<>
			<AddUser addUser={addUserHandler}></AddUser>
			<UserList usersList={users}></UserList>
		</>
	);
};

export default App;
