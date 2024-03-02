import React, { useState } from 'react';

import styles from './Entries.module.css';
import RenameDialog from './RenameDialog';
import EntryItem from './EntryItem';
import { useZip } from './Context';

const Entries = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { copy, rename, remove, entries } = useZip();

  if (!entries) {
    return null;
  }

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRename = (index) => {
    setSelectedIndex(index);

    setShowModal(true);
  };

  const handleSave = (newName) => {
    rename(selectedIndex, newName);

    setShowModal(false);
  };

  const handleCopy = (index) => {
    copy(index);
  };

  const handleRemove = (index) => {
    remove(index);
  };

  return (
    <ul className={styles.root}>
      {entries.map((item, index) => (
        <EntryItem
          done={props.done}
          key={item.filename}
          id={index}
          item={item}
          processFileIndex={props.processFileIndex}
          onRename={handleRename}
          onCopy={handleCopy}
          onRemove={handleRemove}
          phase={props.phase}
        />
      ))}
      {showModal && (
        <RenameDialog
          fileName={entries[selectedIndex].filename}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </ul>
  );
};

export default Entries;
