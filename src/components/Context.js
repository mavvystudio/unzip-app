import React, { useContext, createContext, useState } from 'react';

const zipContext = createContext();

export const Provider = ({ children }) => {
  const value = useZipContext();

  return <zipContext.Provider value={value}>{children}</zipContext.Provider>;
};

export const useZip = () => useContext(zipContext);

function useZipContext() {
  const [entries, setEntries] = useState(null);

  const rename = (index, name) => {
    setEntries(
      entries.map((item, i) => {
        if (index !== i) {
          return item;
        }
        item.filename = name;
        return item;
      }),
    );
  };

  return {
    entries,
    setEntries,
    rename,
  };
}
