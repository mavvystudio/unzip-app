import React from 'react';

const Entries = (props) => {
  if (!props.entries) {
    return null;
  }
  return (
    <ul>
      {props.entries.map((item, index) => (
        <li key={index}>
          {index < props.processFileIndex ? 'ok' : null} {item.filename}
        </li>
      ))}
    </ul>
  );
};

export default Entries;
