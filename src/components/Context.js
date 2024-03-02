import React, { useContext, createContext, useState } from 'react';

import * as utils from '../utils';

const zipContext = createContext();

export const Provider = ({ children }) => {
  const value = useZipContext();

  return <zipContext.Provider value={value}>{children}</zipContext.Provider>;
};

export const useZip = () => useContext(zipContext);

function useZipContext() {
  const [entries, setEntries] = useState(null);

  const rename = (index, name) => {
    entries[index].filename = name;
    setEntries(entries);
  };

  const copy = (index) => {
    const item = entries[index];
    const filename = utils.generateUniqueName(item.filename, entries);
    const newEntries = entries.concat({
      ...item,
      filename,
    });

    setEntries(newEntries);
  };

  const remove = (index) => {
    const items = entries.filter((_, i) => i !== index);
    setEntries(items);
  };

  return {
    entries,
    setEntries,
    rename,
    copy,
    remove,
  };
}
