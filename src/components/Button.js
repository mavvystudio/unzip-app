import React from 'react';

import styles from './Button.module.css';

const Button = (props) => {
  const primary = props.primary ? styles.primary : '';

  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`${styles.root} ${primary}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
