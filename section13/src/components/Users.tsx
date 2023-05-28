import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

export type UserType = {
	id: string;
	name: string;
};

interface State {
	showUsers: boolean;
}

interface Props {
	users: UserType[];
}

class Users extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			showUsers: true,
		};
	}
	/*
	state: State = {
		showUsers: true,
	};
	//*/

	componentDidUpdate() {
		if (this.props.users.length === 0) {
			throw new Error('No users Provided!');
		}
	}
	toggleUsersHandler() {
		this.setState((curState: State) => {
			return { showUsers: !curState.showUsers };
		});
	}

	render() {
		const usersList = (
			<ul>
				{this.props.users.map((user) => (
					<User key={user.id} name={user.name} />
				))}
			</ul>
		);

		return (
			<div className={classes.users}>
				<button onClick={this.toggleUsersHandler.bind(this)}>
					{this.state.showUsers ? 'Hide' : 'Show'} Users
				</button>
				{this.state.showUsers && usersList}
			</div>
		);
	}
}
/*
const Users = () => {
	const [showUsers, setShowUsers] = useState(true);

	const toggleUsersHandler = () => {
		setShowUsers((curState) => !curState);
	};

	const usersList = (
		<ul>
			{DUMMY_USERS.map((user) => (
				<User key={user.id} name={user.name} />
			))}
		</ul>
	);

	return (
		<div className={classes.users}>
			<button onClick={toggleUsersHandler}>
				{showUsers ? 'Hide' : 'Show'} Users
			</button>
			{showUsers && usersList}
		</div>
	);
};
//*/

export default Users;
