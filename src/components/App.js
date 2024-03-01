import React, { useState, useCallback, useEffect } from 'react';

import * as constants from '../constants';
import * as utils from '../utils';
import useZip from '../use-zip.js';
import styles from './App.module.css';

import Alert from './Alert';
import Entries from './Entries';
import HeaderControl from './HeaderControl';

const App = () => {
  const [processFileIndex, setProcessFileIndex] = useState(null);
  const [phase, setPhase] = useState(constants.phase.waiting);
  const { entries, copy, rename, setEntries } = useZip();
  const [dirPicker, setDirPicker] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleExtractFile = useCallback(
    (item) => utils.extractFile(item, dirPicker),
    [dirPicker],
  );

  const started = phase !== constants.phase.waiting;
  const isDone = phase === constants.phase.done;

  useEffect(() => {
    if (isDone) {
      setShowSuccess(true);
    }
  }, [isDone]);

  useEffect(() => {
    (async () => {
      if (
        phase === constants.phase.waiting ||
        phase === constants.phase.paused
      ) {
        return false;
      }

      const item = entries[processFileIndex || 0];

      if (!item) {
        setPhase(constants.phase.done);
        return false;
      }

      try {
        await handleExtractFile(item);
      } catch (e) {
        setPhase(constants.phase.paused);
        setError({
          title: 'Error',
          message:
            'Something went wrong. Please check the contents of the zip file.',
        });
        return false;
      }

      setProcessFileIndex(processFileIndex + 1);
    })();
  }, [
    handleExtractFile,
    phase,
    entries,
    processFileIndex,
    setProcessFileIndex,
  ]);

  const handleClose = () => {
    setShowSuccess(false);
  };

  const handleErrorClose = () => {
    setError(null);
  };
  const defaultProcessIndex = processFileIndex || 0;

  const handleReset = () => {
    setEntries(null);
    setProcessFileIndex(null);
    setPhase(constants.phase.waiting);
  };

  const handleUnZip = async () => {
    if (started) {
      return false;
    }
    try {
      const dirPicker = await window.showDirectoryPicker();
      setDirPicker(dirPicker);
      setPhase(constants.phase.processing);
    } catch (e) {}
  };

  const handlePause = () => {
    const value =
      phase === constants.phase.paused
        ? constants.phase.processing
        : constants.phase.paused;
    setPhase(value);
  };

  return (
    <div className={styles.root}>
      <HeaderControl
        onUnZip={handleUnZip}
        onReset={handleReset}
        onPause={handlePause}
        setEntries={setEntries}
        phase={phase}
        entries={entries}
      />
      <Entries
        entries={entries}
        copy={copy}
        rename={rename}
        processFileIndex={started ? defaultProcessIndex : undefined}
        done={isDone}
        phase={phase}
      />
      {showSuccess && (
        <Alert
          onClose={handleClose}
          title="Success!"
          message="Zip file extracted successfully"
        />
      )}
      {error && (
        <Alert
          onClose={handleErrorClose}
          title={error.title}
          message={error.message}
        />
      )}
    </div>
  );
};

export default App;
