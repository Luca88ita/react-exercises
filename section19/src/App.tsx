import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector } from 'react-redux';
import { ReducerState } from './store/index';

function App() {
	const showCart = useSelector<ReducerState, boolean>(
		(state) => state.ui.showCart
	);

	return <Layout>{showCart ? <Cart /> : <Products />}</Layout>;
}

export default App;
