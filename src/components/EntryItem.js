import React from 'react';

const EntryItem = (props) => {
  const isDone = props.id < props.processFileIndex;

  const handleRename = () => {
    if (isDone) {
      return false;
    }
    props.onRename(props.id);
  };

  const handleCopy = () => {
    props.onCopy(props.id);
  };

  return (
    <li>
      {isDone && 'ok'}
      {props.item.filename}
      <button disabled={isDone} onClick={handleRename}>
        Rename
      </button>
      <button onClick={handleCopy}>Copy</button>
    </li>
  );
};

export default EntryItem;
