import React, { useState } from 'react';

import ModalWrapper from './ModalWrapper';

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
    <ModalWrapper>
      <div>
        <input onChange={handleChange} value={value} />
        <button onClick={handleSave}>Save</button>
        <button onClick={props.onClose}>Cancel</button>
      </div>
    </ModalWrapper>
  );
};

export default RenameDialog;
