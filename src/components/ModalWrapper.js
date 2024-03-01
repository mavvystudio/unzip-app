import React from 'react';
import styles from './ModalWrapper.module.css';

const ModalWrapper = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.backdrop}></div>
      {children}
    </div>
  );
};

export default ModalWrapper;
