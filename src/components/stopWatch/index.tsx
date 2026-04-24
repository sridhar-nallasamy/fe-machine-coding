import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

const StopWatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<number>(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, isRunning]);

  const format = (t: number): string => {
    const min = `${Math.floor(t / 60)}`.padStart(2, '0');
    const sec = `${t % 60}`.padStart(2, '0');
    return `${min}:${sec}`;
  };

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
  };

  const plusFive = () => {
    setTime((t) => t + 5);
  };

  const minusFive = () => {
    setTime((t) => Math.max(t - 5, 0));
  };

  const stop = () => {
    setTime(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>⏱️ Stop Watch!</p>
      <p className={styles.time}>{format(time)}</p>
      <div className={styles.btnsBox}>
        <button onClick={() => start()} disabled={isRunning}>
          Start
        </button>
        <button onClick={() => pause()} disabled={!isRunning || isPaused}>
          Pause
        </button>
        <button onClick={() => resume()} disabled={!isPaused}>
          Resume
        </button>
        <button onClick={() => plusFive()}>+5</button>
        <button onClick={() => minusFive()} disabled={time < 5}>
          -5
        </button>
        <button onClick={() => stop()} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
