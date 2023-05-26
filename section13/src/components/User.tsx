import classes from './User.module.css';
import { Component } from 'react';

interface Props {
	name: string;
}

class User extends Component<Props> {
	componentWillUnmount(): void {
		console.log('User will unmount!');
	}

	render() {
		return <li className={classes.user}>{this.props.name}</li>;
	}
}

/* 
const User = (props: Props) => {
	return <li className={classes.user}>{props.name}</li>;
}; 
//*/

export default User;
