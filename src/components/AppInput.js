import React from 'react';
import { useZip } from './Context';
import * as utils from '../utils';

const AppInput = () => {
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
      const entries = await utils.getEntries(event);
      setEntries(entries);
    };
  };

  return <input type="file" onChange={handleFileChange} />;
};

export default AppInput;
