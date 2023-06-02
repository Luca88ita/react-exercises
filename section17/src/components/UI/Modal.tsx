import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { ReactElement } from 'react';

interface BackDropProps {
	onHideCart: () => void;
}
interface ModalProps {
	children: ReactElement | ReactElement[];
	onHideCart: () => void;
}

const Backdrop = (props: BackDropProps) => {
	return <div className={styles.backdrop} onClick={props.onHideCart} />;
};
const ModalOverlay = (props: ModalProps) => {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

const portalElement = document.getElementById('overlays') as HTMLElement;

const Modal = (props: ModalProps) => {
	const content = (
		<>
			{ReactDOM.createPortal(
				<Backdrop onHideCart={props.onHideCart} />,
				portalElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay onHideCart={props.onHideCart}>
					{props.children}
				</ModalOverlay>,
				portalElement
			)}
		</>
	);

	return content;
};

export default Modal;
