import React from 'react';

const EntryItem = (props) => {
  const isDone = props.id < props.processFileIndex;
  return (
    <li>
      {isDone && 'ok'}
      {props.item.filename}
    </li>
  );
};

export default EntryItem;
