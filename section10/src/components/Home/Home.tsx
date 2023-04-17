import { ReactElement } from 'react';

import Card from '../UI/Card/Card';
import styles from './Home.module.css';

type PropsType = {
	onLogout?: () => any;
	children?: ReactElement | ReactElement[];
};

const Home = ({ children }: PropsType): ReactElement => {
	return (
		<Card className={styles.home}>
			{children ? children : <h1>Welcome back!</h1>}
		</Card>
	);
};

export default Home;
