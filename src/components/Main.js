import React, { useState, useCallback, useEffect } from 'react';

import * as constants from '../constants';
import * as utils from '../utils';
import { useZip } from './Context';
import styles from './Main.module.css';

import Alert from './Alert';
import AppInput from './AppInput';
import Button from './Button';
import Entries from './Entries';

const Main = () => {
  const [processFileIndex, setProcessFileIndex] = useState(null);
  const [phase, setPhase] = useState(constants.phase.waiting);
  const { entries, copy, rename, setEntries } = useZip();
  const [dirPicker, setDirPicker] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleExtractFile = useCallback(
    (item) => utils.extractFile(item, dirPicker),
    [dirPicker],
  );

  const controlText = phase === constants.phase.paused ? 'Resume' : 'Pause';
  const started = phase !== constants.phase.waiting;
  const emptyEntries = !entries?.length;
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

      handleExtractFile(item);
      // simulate processing time
      await utils.tick(300);
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

  const handlePause = () => {
    const value =
      phase === constants.phase.paused
        ? constants.phase.processing
        : constants.phase.paused;
    setPhase(value);
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

  const handleReset = () => {
    setEntries(null);
    setProcessFileIndex(null);
    setPhase(constants.phase.waiting);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <AppInput onReset={handleReset} setEntries={setEntries} />
        <div className={styles.control}>
          <Button
            disabled={emptyEntries || started}
            onClick={handleUnZip}
            primary
          >
            Unzip
          </Button>
          {started && !isDone && (
            <Button disabled={emptyEntries} onClick={handlePause}>
              {controlText}
            </Button>
          )}
        </div>
      </div>
      <Entries
        entries={entries}
        copy={copy}
        rename={rename}
        processFileIndex={started ? processFileIndex || 0 : undefined}
        done={isDone}
      />
      {showSuccess && (
        <Alert
          onClose={handleClose}
          title="Success!"
          message="Zip file extracted successfully"
        />
      )}
    </div>
  );
};

export default Main;
