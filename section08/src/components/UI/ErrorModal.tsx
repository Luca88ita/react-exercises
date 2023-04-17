import styles from './ErrorModal.module.css';
import Card from './Card';
import Button from './Button';
import ReactDOM from 'react-dom';

type PropsType = {
	title?: string;
	message?: string;
	onConfirm: () => void;
};

const Backdrop = ({ onConfirm }: PropsType) => {
	return <div className={styles.backdrop} onClick={onConfirm} />;
};
const ModalOverlay = ({ title, message, onConfirm }: PropsType) => {
	return (
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
	);
};

const ErrorModal = ({ title, message, onConfirm }: PropsType) => {
	const content = (
		<>
			{ReactDOM.createPortal(
				<Backdrop onConfirm={onConfirm} />,
				document.getElementById('backdrop-root') as HTMLElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
				document.getElementById('overlay-root') as HTMLElement
			)}
		</>
	);

	return content;
};

export default ErrorModal;
