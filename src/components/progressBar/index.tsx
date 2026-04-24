import { useEffect, useState } from 'react';

import styles from './styles.module.css';

const ProgressBar = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let timer: number;

    if (isStart) {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p < 100) return p + 1;
          clearInterval(timer);
          setIsStart(false);
          return p;
        });
      }, 60);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isStart]);

  return (
    <div className={styles.rootDiv}>
      <div
        className={`${styles.progressDiv} ${
          isStart && styles.progressDisabled
        }`}
        onClick={() => {
          if (!isStart) {
            setProgress(0);
            setIsStart(true);
          }
        }}
      >
        <p className={styles.progressNum}>{progress}%</p>
        <div
          className={styles.progressFillerDiv}
          style={{ transform: `translateX(${progress - 100}%)` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
