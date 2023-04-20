import { ReactElement, useContext } from 'react';

import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Login2 from './components/Login/Login2';
import AuthContext from './context/auth-context';

const App = (): ReactElement => {
	const ctx = useContext(AuthContext);

	return (
		<>
			<MainHeader />
			<main>
				{!ctx.isLoggedIn && <Login2 />}
				{ctx.isLoggedIn && <Home />}
			</main>
		</>
	);
};

export default App;
