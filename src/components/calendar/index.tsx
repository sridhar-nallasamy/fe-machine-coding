import { useState } from 'react';
import styles from './styles.module.css';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const DateMarker = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        width: '1rem',
        height: '1rem',
        top: 3,
        right: 3,
      }}
    >
      <circle r={6} cx={8} cy={8} fill='red' />
    </svg>
  );
};

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const totalDate = lastDateOfMonth.getDate();
  const firstDay = firstDateOfMonth.getDay();
  const remainingCells = (7 - ((firstDay + totalDate) % 7)) % 7;
  const today = new Date();

  const leftClickHandler = () => {
    setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const rightClickHandler = () => {
    setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.controllerDiv}>
        <button onClick={() => leftClickHandler()}>◀︎</button>
        <span>{`${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')} / ${date.getFullYear()}`}</span>
        <button onClick={() => rightClickHandler()}>▶︎</button>
      </div>
      <div className={styles.calendarGrid}>
        {DAYS.map((day) => (
          <div key={day} className={styles.gridDayBox}>
            <span>{day}</span>
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, idx) => (
          <div
            key={`firstDay-${idx + 1}`}
            className={`${styles.gridDayBox} ${styles.gridDateBox}`}
            style={{ pointerEvents: 'none' }}
          />
        ))}
        {Array.from({ length: totalDate }).map((_, idx) => (
          <div
            key={`lastDateOfMonth-${idx + 1}`}
            className={`${styles.gridDayBox} ${styles.gridDateBox}`}
          >
            {idx + 1}
            {today.getDate() === idx + 1 &&
              today.getMonth() === date.getMonth() &&
              today.getFullYear() == date.getFullYear() && <DateMarker />}
          </div>
        ))}
        {Array.from({ length: remainingCells }).map((_, idx) => (
          <div
            key={`remainingCells-${idx + 1}`}
            className={`${styles.gridDayBox} ${styles.gridDateBox}`}
            style={{ pointerEvents: 'none' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
