import React, { useState } from 'react';

import * as utils from '../utils';

import Alert from './Alert';

const AppInput = (props) => {
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      props.setEntries(null);
      return false;
    }

    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (event) => {
      try {
        const entries = await utils.getEntries(event);
        props.setEntries(entries);
      } catch (e) {
        props.setEntries(null);
        setError({
          title: 'Error reading file',
          message: 'Please make sure you have selected a zip file',
        });
      }
    };
  };

  const handleAlertClose = () => {
    setError(null);
  };

  return (
    <>
      <input name="zipfile" type="file" onChange={handleFileChange} />
      {error && (
        <Alert
          title={error.title}
          message={error.message}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default AppInput;
