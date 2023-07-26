import PropTypes from "prop-types";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal({children, onClose}) {

  useEffect(() => {
    const closeByEsc = (e) => e.key === 'Escape' ? onClose() : null
    document.addEventListener('keydown', closeByEsc);

    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }

  }, [onClose])

  return ReactDOM.createPortal((
    <>
      <ModalOverlay onClose={onClose}/>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </>
  ), document.getElementById('react-modals'))
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func
}