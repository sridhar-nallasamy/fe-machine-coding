import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from './styles.module.css';

const Boxes: React.FC<{ boxesData: number[][] }> = ({ boxesData }) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isUnloading, setIsUnloading] = useState<boolean>(false);

  const timerRef = useRef<number>(0);

  const boxes = useMemo(() => {
    return boxesData.flat(Infinity);
  }, [boxesData]);

  const visibleBoxesCount = useMemo(() => {
    return boxes.reduce((r, b) => {
      if (b === 1) {
        return (r as number) + 1;
      }
      return r;
    }, 0) as number;
  }, [boxes]);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const idx = (e.target as HTMLButtonElement).getAttribute('data-idx');
    const isHidden = (e.target as HTMLButtonElement).getAttribute(
      'data-ishidden',
    );

    if (
      idx === null ||
      isHidden === 'true' ||
      selected.has(parseInt(idx, 10)) ||
      isUnloading
    )
      return;

    setSelected((p) => new Set(p.add(parseInt(idx, 10))));
  };

  const unload = useCallback(() => {
    setIsUnloading(true);

    const idxs = Array.from(selected);

    const removeKey = () => {
      if (!idxs.length) {
        setIsUnloading(false);
        clearTimeout(timerRef.current);
        return;
      }

      const key = idxs.shift()!;

      setSelected((p) => {
        const newSet = new Set(p);
        newSet.delete(key);
        return newSet;
      });

      timerRef.current = setTimeout(removeKey, 500);
    };

    if (idxs.length) {
      removeKey();
    }
  }, [selected]);

  useEffect(() => {
    if (selected.size >= visibleBoxesCount) {
      (() => unload())();
    }
  }, [isUnloading, selected.size, unload, visibleBoxesCount]);

  return (
    <div className={styles.boxesContainer} onClick={clickHandler}>
      {boxes.map((box, idx) => (
        <div
          key={`${box}-${idx}`}
          className={`${styles.box} ${!box && styles.boxHidden} ${
            selected.has(idx) && styles.boxSelected
          }`}
          data-idx={idx}
          data-ishidden={!box}
        />
      ))}
    </div>
  );
};

export default Boxes;
