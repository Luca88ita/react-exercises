import { ReactElement } from 'react';

import Navigation from './Navigation';
import styles from './MainHeader.module.css';

type PropsType = {
	isAuthenticated: boolean;
	onLogout: () => any;
};

const MainHeader = ({ isAuthenticated, onLogout }: PropsType): ReactElement => {
	return (
		<header className={styles['main-header']}>
			<h1>A Typical Page</h1>
			<Navigation isLoggedIn={isAuthenticated} onLogout={onLogout} />
		</header>
	);
};

export default MainHeader;
