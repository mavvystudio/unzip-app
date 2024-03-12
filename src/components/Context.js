import React, { useContext, createContext, useState } from "react";

import * as utils from "../utils";

const zipContext = createContext();

export const Provider = ({ children }) => {
  const value = useZipContext();

  return <zipContext.Provider value={value}>{children}</zipContext.Provider>;
};

export const useZip = () => useContext(zipContext);

function useZipContext() {
  const [entries, setEntries] = useState(null);

  const rename = (index, name) => {
    const newEntries = entries.map((item, i) => {
      if (index !== i) {
        return item;
      }
      item.filename = name;
      return item;
    });

    setEntries(newEntries);
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

  return {
    entries,
    setEntries,
    rename,
    copy,
  };
}
