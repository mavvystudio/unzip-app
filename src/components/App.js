import React, { useState, useEffect } from 'react';

import * as constants from '../constants';
import useZip from '../use-zip.js';
import styles from './App.module.css';

import Alert from './Alert';
import Entries from './Entries';
import HeaderControl from './HeaderControl';

const App = () => {
  const [processFileIndex, setProcessFileIndex] = useState(null);
  const [phase, setPhase] = useState(constants.phase.waiting);
  const { entries, copy, rename, setEntries } = useZip();
  const [alert, setAlert] = useState(null);

  const started = phase !== constants.phase.waiting;
  const isDone = phase === constants.phase.done;

  useEffect(() => {
    if (isDone) {
      setAlert({
        title: 'Success!',
        message: 'Zip file extracted successfully',
      });
    }
  }, [isDone]);

  const handleClose = () => {
    setAlert(null);
  };

  const defaultProcessIndex = processFileIndex || 0;

  return (
    <div className={styles.root}>
      <HeaderControl
        entries={entries}
        setEntries={setEntries}
        processFileIndex={processFileIndex}
        setProcessFileIndex={setProcessFileIndex}
        phase={phase}
        setPhase={setPhase}
        setAlert={setAlert}
      />
      <Entries
        entries={entries}
        copy={copy}
        rename={rename}
        processFileIndex={started ? defaultProcessIndex : undefined}
        done={isDone}
        phase={phase}
      />
      {alert && (
        <Alert
          onClose={handleClose}
          title={alert.title}
          message={alert.message}
        />
      )}
    </div>
  );
};

export default App;
