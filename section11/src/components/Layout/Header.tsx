import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

interface Props {
	temp: string;
}

const Header = (props: Props) => {
	return (
		<>
			<header className={styles.header}>
				<h1>React Meals</h1>
				<HeaderCartButton temp='temp' />
			</header>
			<div className={styles['main-image']}>
				<img src={mealsImage} alt='A table full of delicious food' />
			</div>
		</>
	);
};

export default Header;
