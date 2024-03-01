import React, { useState, useCallback, useEffect } from 'react';

import * as constants from '../constants';
import * as utils from '../utils';
import { useZip } from './Context';
import AppInput from './AppInput';
import Entries from './Entries';

const Main = () => {
  // TODO: do not use index 0 as the initial value
  const [processFileIndex, setProcessFileIndex] = useState(0);
  const [phase, setPhase] = useState(constants.phase.waiting);
  const { entries } = useZip();
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

  const handleUnZip = async () => {
    const dirPicker = await window.showDirectoryPicker();
    setDirPicker(dirPicker);
    setPhase(constants.phase.processing);
  };

  const controlText = phase === constants.phase.paused ? 'Resume' : 'Pause';
  const started = phase !== constants.phase.waiting;
  const emptyEntries = !entries?.length;

  return (
    <div>
      <AppInput />
      <button disabled={emptyEntries} onClick={handleUnZip}>
        Unzip
      </button>
      {started && (
        <button disabled={emptyEntries} onClick={handlePause}>
          {controlText}
        </button>
      )}
      <Entries processFileIndex={processFileIndex} />
    </div>
  );
};

export default Main;
