import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerState } from '../store';
import { authActions } from '../store/auth';

const Header = () => {
	const dispatch = useDispatch();

	const isLoggedIn = useSelector<ReducerState, boolean>(
		(state) => state.auth.isAuthenticated
	);

	const logoutHandler = (): void => {
		dispatch(authActions.logout());
	};

	const content = (
		<header className={classes.header}>
			<h1>Redux Auth</h1>
			{isLoggedIn && (
				<nav>
					<ul>
						<li>
							<a href='/'>My Products</a>
						</li>
						<li>
							<a href='/'>My Sales</a>
						</li>
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					</ul>
				</nav>
			)}
		</header>
	);

	return content;
};

export default Header;
