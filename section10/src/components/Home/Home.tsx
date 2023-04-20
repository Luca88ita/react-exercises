import { ReactElement, useContext } from 'react';

import Card from '../UI/Card/Card';
import styles from './Home.module.css';
import AuthContext from '../../context/auth-context';
import Button from '../UI/Button/Button';

type PropsType = {
	onLogout?: () => any;
	children?: ReactElement | ReactElement[];
};

const Home = ({ onLogout, children }: PropsType): ReactElement => {
	const ctx = useContext(AuthContext);
	return (
		<Card className={styles.home}>
			{children ? (
				children
			) : (
				<>
					<h1>Welcome back!</h1>
					<Button onClick={ctx.onLogout}>Logout</Button>
				</>
			)}
		</Card>
	);
};

export default Home;
