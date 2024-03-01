import React from 'react';
import styles from './ModalWrapper.module.css';

const ModalWrapper = (props) => {
  return (
    <div className={styles.root}>
      <div onClick={props.onClose} className={styles.backdrop}></div>
      {props.children}
    </div>
  );
};

export default ModalWrapper;
