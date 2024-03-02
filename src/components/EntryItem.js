import React from 'react';

import styles from './EntryItem.module.css';
import Button from './Button';

const EntryItem = (props) => {
  console.log(props.item);
  const isDone = props.id < props.processFileIndex;
  const isCurrent = props.id === props.processFileIndex;
  const done = isDone && 'done';
  const current = isCurrent && 'current';

  const handleRename = () => {
    if (isDone) {
      return false;
    }
    props.onRename(props.id);
  };

  const handleCopy = () => {
    props.onCopy(props.id);
  };

  const entryStatus = styles[done || current];
  const isDisabled = isDone || isCurrent;

  return (
    <li className={`${styles.root} ${entryStatus}`}>
      <div className={styles.control}>
        <Button disabled={isDisabled} onClick={handleRename}>
          Rename
        </Button>
        <Button onClick={handleCopy}>Copy</Button>
      </div>
      {props.item.filename}
    </li>
  );
};

export default EntryItem;
