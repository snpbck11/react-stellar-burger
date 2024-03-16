import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { IModalProps } from "../../services/types/data";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalsRoot = document.getElementById("react-modals");

interface IKeyboardEvent {
  key: string;
};

const Modal: FC<IModalProps> = ({ children, onClose }) => {

  const closeByEsc = (e: IKeyboardEvent) => e.key === 'Escape' ? onClose() : null

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc)
    };
  }, [onClose])

  return modalsRoot && ReactDOM.createPortal((
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>
  ), modalsRoot);
};

export default Modal;