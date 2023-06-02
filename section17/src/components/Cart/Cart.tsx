import { useContext, useState } from 'react';
import CartContext from '../../store/CartContext';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import { Item } from '../Meals/MealItem/MealItem';
import Checkout, { FormInput } from './Checkout';

interface CartProps {
	onHideCart: () => void;
}

const Cart = (props: CartProps) => {
	const [isCheckout, setIsCheckout] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [didSubmit, setDidSubmit] = useState<boolean>(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = Intl.NumberFormat('it-IT', {
		style: 'currency',
		currency: 'EUR',
	}).format(cartCtx.totalAmount);

	const hasItems = cartCtx.items.length > 0;

	const cartItemsRemoveHandler = (id: string) => {
		cartCtx.removeItem(id);
	};
	const cartItemsAddHandler = (item: Item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData: FormInput) => {
		setIsSubmitting(true);
		await fetch(
			'https://react-exercises-b6291-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
			{
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={styles['cart-items']}>
			{cartCtx.items.map((item: Item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemsRemoveHandler.bind(null, item.id)}
					onAdd={cartItemsAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const moduleActions = (
		<div className={styles.actions}>
			<button className={styles['button--alt']} onClick={props.onHideCart}>
				Close
			</button>
			{hasItems === true && (
				<button className={styles.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<>
				{isCheckout && (
					<Checkout
						onCancel={props.onHideCart}
						onConfirm={submitOrderHandler}
					/>
				)}
			</>
			<>{!isCheckout && moduleActions}</>
		</>
	);

	const didSubmitModalContent = (
		<>
			<p>Successfully sent the Order!</p>
			<div className={styles.actions}>
				<button className={styles.actions} onClick={props.onHideCart}>
					Close
				</button>
			</div>
		</>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;
	return (
		<Modal onHideCart={props.onHideCart}>
			<>
				{!isSubmitting && !didSubmit && cartModalContent}
				{isSubmitting && isSubmittingModalContent}
				{didSubmit && didSubmitModalContent}
			</>
		</Modal>
	);
};

export default Cart;
