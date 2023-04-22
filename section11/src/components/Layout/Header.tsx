import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

interface Props {
	onShowCart: () => void;
}

const Header = (props: Props) => {
	return (
		<>
			<header className={styles.header}>
				<h1>React Meals</h1>
				<HeaderCartButton onShowCart={props.onShowCart} />
			</header>
			<div className={styles['main-image']}>
				<img src={mealsImage} alt='A table full of delicious food' />
			</div>
		</>
	);
};

export default Header;
