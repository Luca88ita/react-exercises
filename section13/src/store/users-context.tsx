import { createContext } from 'react';

type UserType = {
	id: string;
	name: string;
};
type ContextType = {
	users: UserType[];
};

const UsersContext = createContext<ContextType>({
	users: [],
});

export default UsersContext;
