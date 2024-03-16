import { FC } from "react";
import { IModalProps } from "../../services/types/data";
import styles from "./modal-overlay.module.css";

const ModalOverlay: FC<IModalProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}></div>
  );
};

export default ModalOverlay;