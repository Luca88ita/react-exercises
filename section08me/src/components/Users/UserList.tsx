import { useState } from 'react';
import styles from './UserList.module.css';
import { User } from './AddUser';
import Card from '../UI/Card';

type PropsType = {
	usersList: User[];
};

const UserList = ({ usersList }: PropsType) => {
	const content = usersList.length !== 0 && (
		<ul className={styles.ul}>
			{usersList.map((user) => (
				<li className={styles.li} key={Math.random()}>
					<p>{`${user.username} (${user.age} years old)`}</p>
				</li>
			))}
		</ul>
	);

	return <div className={styles.userList}>{content}</div>;
};

export default UserList;
