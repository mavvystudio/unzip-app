import React from 'react';

const EntryItem = (props) => {
  const isDone = props.id < props.processFileIndex;

  const handleRename = () => {
    props.onRename(props.id);
  };

  const handleCopy = () => {};

  return (
    <li>
      {isDone && 'ok'}
      {props.item.filename}
      <button onClick={handleRename}>Rename</button>
      <button onClick={handleCopy}>Copy</button>
    </li>
  );
};

export default EntryItem;
