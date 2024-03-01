import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const Modal = (props) => {
  return createPortal(
    <div className={styles.root}>
      <div onClick={props.onClose} className={styles.backdrop}></div>
      {props.children}
    </div>,
    document.body,
  );
};

export default Modal;
