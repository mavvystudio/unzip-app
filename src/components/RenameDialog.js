import React, { useState } from 'react';

import ModalWrapper from './ModalWrapper';
import styles from './RenameDialog.module.css';

const RenameDialog = (props) => {
  const [fileName, fileExtension] = (props.fileName || '').split('.');
  const [value, setValue] = useState(fileName || '');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    props.onSave(`${value}${fileExtension || ''}`);
  };

  return (
    <ModalWrapper onClose={props.onClose}>
      <div className={styles.root}>
        <input className={styles.input} onChange={handleChange} value={value} />
        <div className={styles.control}>
          <button onClick={props.onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default RenameDialog;
