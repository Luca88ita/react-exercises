import { createContext } from 'react';
import { UserType } from '../components/Users';

export interface ContextInterface {
	users: UserType[];
}

const UsersContext = createContext<ContextInterface>({
	users: [],
});

export default UsersContext;
