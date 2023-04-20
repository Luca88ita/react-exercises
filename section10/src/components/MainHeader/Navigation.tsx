import { ReactElement, useContext } from 'react';
import styles from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

const Navigation = (): ReactElement => {
	const ctx = useContext(AuthContext);
	return (
		<nav className={styles.nav}>
			<ul>
				{ctx.isLoggedIn && (
					<li>
						<a href='/'>Users</a>
					</li>
				)}
				{ctx.isLoggedIn && (
					<li>
						<a href='/'>Admin</a>
					</li>
				)}
				{ctx.isLoggedIn && (
					<li>
						<button onClick={ctx.onLogout}>Logout</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
