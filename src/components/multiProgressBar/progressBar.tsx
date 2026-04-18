import { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.css';

type LabeledProgressBarFcProps = {
  id: number;
  onClose: (idx: number) => void;
};

const LabeledProgressBar: React.FC<LabeledProgressBarFcProps> = ({
  id,
  onClose,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [, setTimerId] = useState<number | undefined>();

  const cleanUp = useCallback(
    (timerId: number) => {
      clearInterval(timerId);
      onClose(id);
    },
    [id, onClose],
  );

  useEffect(() => {
    let newTimerId: number | undefined;

    (() => {
      setTimerId((id) => {
        if (typeof id !== 'undefined') return;

        newTimerId = setInterval(() => {
          setProgress((p) => {
            if (p === 100) {
              cleanUp(newTimerId!);
            }
            return p + 1;
          });
        }, 100);

        return newTimerId;
      });
    })();
  }, [cleanUp]);

  return (
    <div className={styles.progessBarBg}>
      <div
        className={styles.progessBarFill}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
      <p className={styles.progressLabel}>{`${id}: ${progress}%`}</p>
    </div>
  );
};

export default LabeledProgressBar;
