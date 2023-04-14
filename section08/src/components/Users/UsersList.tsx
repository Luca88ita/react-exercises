import Card from '../UI/Card';
import styles from './UsersList.module.css';

export type UserAttributes = {
	name: string;
	age: number;
	id: string;
};

type PropsType = {
	users: UserAttributes[];
};

const UsersList = ({ users }: PropsType) => {
	const content = (
		<Card className={styles.users}>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						{user.name} ({user.age} years old)
					</li>
				))}
			</ul>
		</Card>
	);
	return content;
};

export default UsersList;
