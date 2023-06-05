import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';

export interface ProductItemInterface {
	id: string;
	title: string;
	price: number;
	description: string;
}

export interface ProductInterface {
	item: ProductItemInterface;
}

const ProductItem = (props: ProductItemInterface) => {
	const { id, title, price, description } = props;
	const dispatch = useDispatch();

	const addToCartHandler = (): void => {
		dispatch(
			cartActions.addItemToCart({
				id,
				title,
				price,
			})
		);
		console.log(id, price, title);
	};

	return (
		<li className={classes.item} key={id}>
			<Card>
				<header>
					<h3>{title}</h3>
					<div className={classes.price}>${price.toFixed(2)}</div>
				</header>
				<p>{description}</p>
				<div className={classes.actions}>
					<button onClick={addToCartHandler}>Add to Cart</button>
				</div>
			</Card>
		</li>
	);
};

export default ProductItem;
