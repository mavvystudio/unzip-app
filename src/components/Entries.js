import React, { useState } from 'react';

import styles from './Entries.module.css';
import RenameDialog from './RenameDialog';
import EntryItem from './EntryItem';

const Entries = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!props.entries) {
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
    props.rename(selectedIndex, newName);

    setShowModal(false);
  };

  const handleCopy = (index) => {
    props.copy(index);
  };

  return (
    <ul className={styles.root}>
      {props.entries.map((item, index) => (
        <EntryItem
          key={index}
          id={index}
          item={item}
          processFileIndex={props.processFileIndex}
          onRename={handleRename}
          onCopy={handleCopy}
        />
      ))}
      {showModal && (
        <RenameDialog
          fileName={props.entries[selectedIndex].filename}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </ul>
  );
};

export default Entries;
