import React, { useState, useCallback, useEffect } from 'react';

import * as constants from '../constants';
import * as utils from '../utils';
import styles from './App.module.css';
import Entries from './Entries';

const Unzipper = () => {
  // TODO: do not use index 0 as the initial value
  const [processFileIndex, setProcessFileIndex] = useState(0);
  const [phase, setPhase] = useState(constants.phase.waiting);
  const [entries, setEntries] = useState(null);
  const [dirPicker, setDirPicker] = useState(null);

  const handleExtractFile = useCallback(
    (item) => utils.extractFile(item, dirPicker),
    [dirPicker],
  );

  useEffect(() => {
    (async () => {
      if (
        phase === constants.phase.waiting ||
        phase === constants.phase.paused
      ) {
        return false;
      }

      const item = entries[processFileIndex];

      if (!item) {
        setPhase(constants.phase.done);
        return false;
      }

      handleExtractFile(item);
      await utils.tick();
      setProcessFileIndex(processFileIndex + 1);
    })();
  }, [
    handleExtractFile,
    phase,
    entries,
    processFileIndex,
    setProcessFileIndex,
  ]);

  const handlePause = () => {
    const value =
      phase === constants.phase.paused
        ? constants.phase.processing
        : constants.phase.paused;
    setPhase(value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setEntries(null);
      return false;
    }

    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (event) => {
      const entries = await utils.getEntries(event);
      setEntries(entries);
    };
  };

  const handleUnZip = async () => {
    const dirPicker = await window.showDirectoryPicker();
    setDirPicker(dirPicker);
    setPhase(constants.phase.processing);
  };

  const controlText = phase === constants.phase.paused ? 'Resume' : 'Pause';
  const started = phase !== constants.phase.waiting;
  const emptyEntries = !entries?.length;

  return (
    <div className={styles.root}>
      <input type="file" onChange={handleFileChange} />
      <button disabled={emptyEntries} onClick={handleUnZip}>
        Unzip
      </button>
      {started && (
        <button disabled={emptyEntries} onClick={handlePause}>
          {controlText}
        </button>
      )}
      <Entries entries={entries} processFileIndex={processFileIndex} />
    </div>
  );
};

export default Unzipper;
