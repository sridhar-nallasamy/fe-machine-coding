import styles from './styles.module.css';

const PIXELS_PER_HOUR = 100;
const HOURS = Array.from({ length: 24 }, (_, i) => i);

const EVENTS = [
  {
    id: 1,
    start: new Date(0, 0, 0, 3),
    end: new Date(0, 0, 0, 4, 30),
    name: 'Event 1',
  },
  {
    id: 2,
    start: new Date(0, 0, 0, 5),
    end: new Date(0, 0, 0, 7),
    name: 'Event 2',
  },
  {
    id: 3,
    start: new Date(0, 0, 0, 12),
    end: new Date(0, 0, 0, 16, 30),
    name: 'Event 3',
  },
  {
    id: 4,
    start: new Date(0, 0, 0, 5),
    end: new Date(0, 0, 0, 6),
    name: 'Event 4',
  },
];

const COLORS = [
  'red',
  'green',
  'blue',
  'orange',
  'pink',
  'indigo',
  'teal',
  'brown',
  'cyan',
  'gray',
];

const formatHour = (hour: number) => {
  const date = new Date(0, 0, 0, hour);
  return date
    .toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase();
};

const getMins = (date: Date) => {
  return (date.getHours() + date.getMinutes() / 60) * PIXELS_PER_HOUR + 13;
};

const getFrame = (
  event: (typeof EVENTS)[number],
): { top: string; height: string } => {
  const r = {
    top: `${getMins(event.start)}px`,
    height: `${getMins(event.end) - getMins(event.start)}px`,
  };
  return r;
};

const SingleDayEvents = () => {
  return (
    <div className={styles.container}>
      <div className={styles.eventContainer}>
        {HOURS.map((i) => (
          <div key={`time-${i}`} className={styles.timelineBox}>
            <span className={styles.timelineLabel}>{formatHour(i)}</span>
            <div className={styles.divider} />
          </div>
        ))}
        {EVENTS.map((event, i) => (
          <div
            key={event.id}
            style={{
              backgroundColor: COLORS[i % COLORS.length],
              left: 90,
              ...getFrame(event),
            }}
            className={styles.eventBox}
          >
            <p>{event.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleDayEvents;
