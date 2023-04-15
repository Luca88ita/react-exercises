import styles from './ErrorModal.module.css';
import Card from './Card';
import Button from './Button';

type PropsType = {
	title: string;
	message: string;
	onConfirm: () => void;
};

const ErrorModal = ({ title, message, onConfirm }: PropsType) => {
	const content = (
		<div>
			<div className={styles.backdrop} onClick={onConfirm}></div>
			<Card className={styles.modal}>
				<header className={styles.header}>
					<h2>{title}</h2>
				</header>
				<div className={styles.content}>
					<p>{message}</p>
				</div>
				<footer className={styles.actions}>
					<Button onClick={onConfirm}>Okay</Button>
				</footer>
			</Card>
		</div>
	);

	return content;
};

export default ErrorModal;
