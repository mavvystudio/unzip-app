import React from 'react';

import * as constants from '../constants';
import styles from './HeaderControl.module.css';
import AppInput from './AppInput';
import Button from './Button';

const HeaderControl = (props) => {
  const started = props.phase !== constants.phase.waiting;
  const isDone = props.phase === constants.phase.done;
  const controlText =
    props.phase === constants.phase.paused ? 'Resume' : 'Pause';
  const emptyEntries = !props.entries?.length;
  const showPauseResumeBtn = started && !isDone;

  return (
    <div className={styles.root}>
      <AppInput onReset={props.onReset} setEntries={props.setEntries} />
      <div className={styles.control}>
        <Button
          disabled={emptyEntries || started}
          onClick={props.onUnZip}
          primary
        >
          Unzip
        </Button>
        {showPauseResumeBtn && (
          <Button disabled={emptyEntries} onClick={props.onPause}>
            {controlText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderControl;
