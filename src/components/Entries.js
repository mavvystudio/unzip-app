import React from 'react';

import { useZip } from './Context';
import EntryItem from './EntryItem';

const Entries = (props) => {
  const { entries } = useZip();

  if (!entries) {
    return null;
  }

  return (
    <ul>
      {entries.map((item, index) => (
        <EntryItem
          key={index}
          id={index}
          item={item}
          processFileIndex={props.processFileIndex}
        />
      ))}
    </ul>
  );
};

export default Entries;
