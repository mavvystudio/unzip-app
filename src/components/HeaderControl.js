import React, { useState, useEffect, useCallback } from 'react';

import * as utils from '../utils';
import * as constants from '../constants';
import styles from './HeaderControl.module.css';
import AppInput from './AppInput';
import Button from './Button';
import { useZip } from './Context';

const HeaderControl = (props) => {
  const [dirPicker, setDirPicker] = useState(null);
  const { entries, setEntries } = useZip();

  const handleExtractFile = useCallback(
    (item) => utils.extractFile(item, dirPicker),
    [dirPicker],
  );
  useEffect(() => {
    (async () => {
      if (
        props.phase === constants.phase.waiting ||
        props.phase === constants.phase.paused
      ) {
        return false;
      }

      const item = entries[props.processFileIndex || 0];

      if (!item) {
        props.setPhase(constants.phase.done);
        return false;
      }

      try {
        await handleExtractFile(item);
      } catch (e) {
        props.setPhase(constants.phase.paused);
        props.setAlert({
          title: 'Error',
          message:
            'Something went wrong. Please check the contents of the zip file.',
        });
        return false;
      }

      props.setProcessFileIndex(props.processFileIndex + 1);
    })();
  }, [handleExtractFile, entries, props]);

  const started = props.phase !== constants.phase.waiting;
  const isDone = props.phase === constants.phase.done;
  const controlText =
    props.phase === constants.phase.paused ? 'Resume' : 'Pause';
  const emptyEntries = !entries?.length;
  const showPauseResumeBtn = started && !isDone;

  const handlePause = () => {
    const value =
      props.phase === constants.phase.paused
        ? constants.phase.processing
        : constants.phase.paused;
    props.setPhase(value);
  };

  const handleUnZip = async () => {
    if (started) {
      return false;
    }
    try {
      const dirPicker = await window.showDirectoryPicker();
      setDirPicker(dirPicker);
      props.setPhase(constants.phase.processing);
    } catch (e) {}
  };

  const handleReset = () => {
    setEntries(null);
    props.setProcessFileIndex(null);
    props.setPhase(constants.phase.waiting);
  };

  return (
    <div className={styles.root}>
      <AppInput onReset={handleReset} setEntries={setEntries} />
      <div className={styles.control}>
        <Button
          disabled={emptyEntries || started}
          onClick={handleUnZip}
          primary
        >
          Unzip
        </Button>
        {showPauseResumeBtn && (
          <Button disabled={emptyEntries} onClick={handlePause}>
            {controlText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderControl;
