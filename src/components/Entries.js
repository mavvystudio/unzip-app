import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { useZip } from './Context';
import RenameDialog from './RenameDialog';
import EntryItem from './EntryItem';

const Entries = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { entries, rename, copy } = useZip();

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
  };

  const handleCopy = (index) => {
    copy(index);
  };

  return (
    <ul>
      {entries.map((item, index) => (
        <EntryItem
          key={index}
          id={index}
          item={item}
          processFileIndex={props.processFileIndex}
          onRename={handleRename}
          onCopy={handleCopy}
        />
      ))}
      {showModal &&
        createPortal(
          <RenameDialog
            fileName={entries[selectedIndex].filename}
            onClose={handleClose}
            onSave={handleSave}
          />,
          document.body,
        )}
    </ul>
  );
};

export default Entries;
