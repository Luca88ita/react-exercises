import { Component, ChangeEvent, Context, ContextType } from 'react';

import Users, { UserType } from './Users';
import classes from './UserFinder.module.css';
import UsersContext, { ContextInterface } from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

interface State {
	filteredUsers: UserType[];
	searchTerm: string;
}

interface Props {
	dummy?: string;
}

class UserFinder extends Component<Props, State, ContextInterface> {
	static contextType: Context<ContextInterface> = UsersContext;
	declare context: ContextType<typeof UsersContext>;

	constructor(props: Props) {
		super(props);
		this.state = {
			filteredUsers: [],
			searchTerm: '',
		};
	}

	componentDidMount() {
		// Send http request...
		this.setState({ filteredUsers: this.context.users });
	}

	componentDidUpdate(_prevProps: Props, prevState: State) {
		if (prevState.searchTerm !== this.state.searchTerm) {
			this.setState({
				filteredUsers: this.context.users.filter((user) =>
					user.name.includes(this.state.searchTerm)
				),
			});
		}
	}

	searchChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		return (
			<>
				<div className={classes.finder}>
					<input type='search' onChange={this.searchChangeHandler.bind(this)} />
				</div>
				<ErrorBoundary>
					<Users users={this.state.filteredUsers} />
				</ErrorBoundary>
			</>
		);
	}
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
