import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem, { CartItemInterface } from './CartItem';
import { ReducerState } from '../../store';

const Cart = () => {
	const cartItems = useSelector<ReducerState, CartItemInterface[]>(
		(state) => state.cart.items
	);

	return (
		<Card className={classes.cart}>
			<h2>Your Shopping Cart</h2>
			<ul>
				{cartItems.map((item) => (
					<CartItem
						key={item.id}
						item={{
							id: item.id,
							title: item.title,
							quantity: item.quantity,
							total: item.total,
							price: item.price,
						}}
					/>
				))}
			</ul>
		</Card>
	);
};

export default Cart;
