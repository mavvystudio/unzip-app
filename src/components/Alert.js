import React from 'react';

import styles from './Alert.module.css';
import Modal from './Modal';

const Alert = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <article className={styles.root}>
        <header>
          <h1>{props.title}</h1>
        </header>
        <p>{props.message}</p>
      </article>
    </Modal>
  );
};

export default Alert;
