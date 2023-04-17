import Button from './Button';
import Card from './Card';
import styles from './ErrorModal.module.css';

export type ErrorMessage = {
	title: string;
	message: string;
	onConfirm: () => void;
};

type PropsType = {
	error: ErrorMessage;
};

const ErrorModal = ({ error }: PropsType) => {
	const content = (
		<>
			{/* questo è il div che conterrà lo sfondo nero per il messaggio d`errore */}
			<div className={styles.backdrop} onClick={error.onConfirm}></div>
			{/* mentre questa è la card col messaggio d`errore vero e proprio */}
			<Card className={styles.modal}>
				<header className={styles.header}>
					<h2>{error.title}</h2>
				</header>
				<main className={styles.main}>
					<p>{error.message}</p>
				</main>
				<footer className={styles.footer}>
					<Button onClick={error.onConfirm}>OK</Button>
				</footer>
			</Card>
		</>
	);

	return content;
};

export default ErrorModal;
