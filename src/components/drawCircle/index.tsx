import { useRef, useState } from 'react';

import styles from './styles.module.css';

type CircleProps = { id: number; x: number; y: number; color: string };

const COLOURS = ['red', 'blue', 'green', 'orange', 'purple'];
const DIAMETER = 32;

const DrawCircle = () => {
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [stack, setStack] = useState<CircleProps[]>([]);
  const circlesBoxRef = useRef<HTMLDivElement>(null);

  const getRandomInt = (min: number, max: number) => {
    const low = Math.floor(min);
    const high = Math.ceil(max);
    return Math.floor(Math.random() * (high - low + 1)) + min;
  };

  const drawCirle = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!circlesBoxRef.current) return;

    const { clientX, clientY } = e;

    const rect = circlesBoxRef.current.getBoundingClientRect();

    const x = clientX - rect.left - DIAMETER / 2;
    const y = clientY - rect.top - DIAMETER / 2;

    setCircles((prev) => [
      ...prev,
      {
        id: Date.now(),
        x,
        y,
        color: COLOURS[getRandomInt(1, COLOURS.length) - 1],
      },
    ]);
  };

  const undoHandler = () => {
    const lastCircle = circles.at(-1);
    setStack((prev) => [...prev, lastCircle!]);
    setCircles((prev) => prev.slice(0, -1));
  };

  const redoHandler = () => {
    const lastCircle = stack.at(-1);
    setCircles((prev) => [...prev, lastCircle!]);
    setStack((prev) => prev.slice(0, -1));
  };

  const resetHandler = () => {
    setStack([]);
    setCircles([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button onClick={() => undoHandler()} disabled={!circles.length}>
          Undo
        </button>
        <button onClick={() => redoHandler()} disabled={!stack.length}>
          Repo
        </button>
        <button
          onClick={() => resetHandler()}
          disabled={!circles.length && !stack.length}
        >
          Reset
        </button>
      </div>
      <div
        className={styles.circlesDiv}
        onClick={drawCirle}
        ref={circlesBoxRef}
      >
        {circles.map((circle) => (
          <div
            key={circle.id}
            className={styles.circle}
            style={{
              width: `${DIAMETER}px`,
              height: `${DIAMETER}px`,
              top: circle.y,
              left: circle.x,
              backgroundColor: circle.color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DrawCircle;
