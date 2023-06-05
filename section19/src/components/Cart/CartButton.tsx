import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';
import { ReducerState } from '../../store';

const CartButton = () => {
	const dispatch = useDispatch();

	const cartQuantity = useSelector<ReducerState, number>(
		(state) => state.cart.totalQuantity
	);

	const toggleCartHandler = (): void => {
		dispatch(uiActions.toggleCart());
	};

	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQuantity}</span>
		</button>
	);
};

export default CartButton;
