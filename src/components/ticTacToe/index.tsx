import { Fragment, useRef, useState } from 'react';

import styles from './styles.module.css';

const TicTacToe = () => {
  const [boxSize, setBoxSize] = useState<number>(3);
  const [message, setMessage] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [player, setPlayer] = useState<number>(1);
  const [move, setMove] = useState<Map<string, number>>(new Map());

  const trackerRef = useRef<{
    row: number[];
    col: number[];
    diag: number;
    antiDiag: number;
  }>(null);

  const onStartClick = () => {
    setIsStarted(true);
    trackerRef.current = {
      row: Array(boxSize).fill(0),
      col: Array(boxSize).fill(0),
      diag: 0,
      antiDiag: 0,
    };
  };

  const onStopClick = () => {
    setIsStarted(false);
    setMove(new Map());
    setPlayer(1);
    setMessage('');
    trackerRef.current = null;
  };

  const checkWinner = (i: number, j: number): boolean => {
    if (!trackerRef.current) return false;

    const t = trackerRef.current;
    if (
      Math.abs(t.row[i]) === boxSize ||
      Math.abs(t.col[j]) === boxSize ||
      Math.abs(t.diag) === boxSize ||
      Math.abs(t.antiDiag) === boxSize
    ) {
      return true;
    }
    return false;
  };

  const onClickHandler = (i: number, j: number) => {
    if (!isStarted || move.has(`${i}-${j}`) || !trackerRef.current) return;

    setMove((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(`${i}-${j}`, player);
      return newMap;
    });

    trackerRef.current.row[i] += player;
    trackerRef.current.col[j] += player;

    if (i === j) {
      trackerRef.current.diag += player;
    }

    if (i + j === boxSize - 1) {
      trackerRef.current.antiDiag += player;
    }

    if (checkWinner(i, j)) {
      setMessage(`Player ${player === 1 ? 'X' : 'O'} wins! 🎉`);
      return;
    }

    setPlayer((prev) => prev * -1);

    if (move.size === boxSize * boxSize - 1) {
      setMessage('Match draw! 🏁');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controllerBox}>
        <select
          value={boxSize}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10);
            setBoxSize(newValue);
          }}
          className={styles.inputField}
          disabled={isStarted}
        >
          {Array.from({ length: 4 }).map((_, idx) => (
            <option key={idx + 3} value={idx + 3}>
              {idx + 3}
            </option>
          ))}
        </select>
        <button
          className={styles.controlBtn}
          disabled={isStarted}
          onClick={() => onStartClick()}
        >
          Start
        </button>
        <button
          className={styles.controlBtn}
          disabled={!isStarted}
          onClick={() => onStopClick()}
        >
          Stop
        </button>
      </div>
      <p className={styles.message}>{message}</p>
      <div className={styles.boardWrapper}>
        <div
          className={styles.board}
          style={{ gridTemplateColumns: `repeat(${boxSize}, 2.2rem)` }}
        >
          {Array.from({
            length: boxSize,
          }).map((_, i) => (
            <Fragment key={`board-cell-row-${i}`}>
              {Array.from({ length: boxSize }).map((_, j) => (
                <div
                  key={`board-cell-col-${j}`}
                  className={`${styles.boardCell} ${
                    move.has(`${i}-${j}`) && styles.boardCellDisabled
                  }`}
                  onClick={() => onClickHandler(i, j)}
                >
                  {move.has(`${i}-${j}`) && (
                    <p>{move.get(`${i}-${j}`) === 1 ? 'X' : 'O'}</p>
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
