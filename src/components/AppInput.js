import React, { useState } from 'react';

import { useZip } from './Context';
import * as utils from '../utils';

import Alert from './Alert';

const AppInput = () => {
  const [error, setError] = useState(null);
  const { setEntries } = useZip();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setEntries(null);
      return false;
    }

    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (event) => {
      try {
        const entries = await utils.getEntries(event);
        setEntries(entries);
      } catch (e) {
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
      <input type="file" onChange={handleFileChange} />
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
