import Auth from './components/Auth';
import Counter from './components/Counter';
import Header from './components/Header';
import UserProfile from './components/UserProfile';

import { useSelector } from 'react-redux';
import { ReducerState } from './store';

function App() {
	const isLoggedIn = useSelector<ReducerState, boolean>(
		(state) => state.auth.isAuthenticated
	);
	return (
		<>
			<Header />
			{isLoggedIn ? <UserProfile /> : <Auth />}
			<Counter />
		</>
	);
}

export default App;
