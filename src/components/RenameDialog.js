import React, { useState } from 'react';

import Button from './Button';
import Modal from './Modal';
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
    <Modal onClose={props.onClose}>
      <div className={styles.root}>
        <input className={styles.input} onChange={handleChange} value={value} />
        <div className={styles.control}>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

export default RenameDialog;
