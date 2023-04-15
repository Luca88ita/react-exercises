import styles from './UserList.module.css';
import { User } from './AddUser';
import Card from '../UI/Card';

type PropsType = {
	usersList: User[];
};

const UserList = ({ usersList }: PropsType) => {
	const content = usersList.length !== 0 && (
		<Card className={styles.userList}>
			<ul>
				{usersList.map((user) => (
					<li key={Math.random()}>
						{user.username} ({user.age} years old)
					</li>
				))}
			</ul>
		</Card>
	);

	return content;
};

export default UserList;
