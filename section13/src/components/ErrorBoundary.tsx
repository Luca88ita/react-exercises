import { Component, ReactElement } from 'react';

interface Props {
	children?: ReactElement | ReactElement[];
}
interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(): void {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <p>Something went wrong</p>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
