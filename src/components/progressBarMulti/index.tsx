import { type ChangeEvent, useState } from 'react';

import LabeledProgressBar from './progressBar';
import styles from './styles.module.css';

const MultiProgressBar = () => {
  const [queue, setQueue] = useState<number[]>([]);
  const [nextId, setNextId] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3);

  const handleAdd = () => {
    setQueue((p) => [...p, nextId]);
    setNextId((p) => p + 1);
  };

  const handleClose = (idx: number) => {
    setQueue((p) => p.filter((i) => i !== idx));
  };

  const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(e.target.value, 10));
    setQueue([]);
    setNextId(0);
  };

  return (
    <div className={styles.rootBox}>
      <div className={styles.controllersBox}>
        <button className={styles.addBtn} onClick={handleAdd}>
          Add
        </button>
        <select
          className={styles.limitSelect}
          value={limit}
          onChange={handleLimitChange}
          disabled={!!queue.length}
        >
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
        <p className={styles.inQueueTypo}>
          In Queue: <span>{Math.max(0, queue.length - limit)}</span>
        </p>
      </div>
      <div className={styles.progressBarsBox}>
        {queue.map((id, idx) =>
          idx < limit ? (
            <LabeledProgressBar id={id} onClose={handleClose} key={id} />
          ) : null,
        )}
      </div>
    </div>
  );
};

export default MultiProgressBar;
