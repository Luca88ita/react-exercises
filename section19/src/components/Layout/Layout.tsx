import { Fragment, ReactElement } from 'react';
import MainHeader from './MainHeader';

interface LayoutProps {
	children: ReactElement | ReactElement[];
}

const Layout = (props: LayoutProps) => {
	return (
		<Fragment>
			<MainHeader />
			<main>{props.children}</main>
		</Fragment>
	);
};

export default Layout;
