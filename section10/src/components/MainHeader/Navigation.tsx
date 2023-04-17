import { ReactElement } from 'react';
import styles from './Navigation.module.css';

type PropsType = {
	isLoggedIn: boolean;
	onLogout: () => any;
};

const Navigation = ({ isLoggedIn, onLogout }: PropsType): ReactElement => {
	return (
		<nav className={styles.nav}>
			<ul>
				{isLoggedIn && (
					<li>
						<a href='/'>Users</a>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<a href='/'>Admin</a>
					</li>
				)}
				{isLoggedIn && (
					<li>
						<button onClick={onLogout}>Logout</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
