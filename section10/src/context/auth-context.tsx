import { ReactElement, createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	onLogin: (email: string, password: string) => {},
	onLogout: () => {},
});

type PropsType = {
	children: ReactElement | ReactElement[];
};

export const AuthContextProvider = ({ children }: PropsType) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInformation = localStorage.getItem('isLoggedIn');

		if (storedUserLoggedInformation === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	const loginHandler = () => {
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogin: loginHandler,
				onLogout: logoutHandler,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
