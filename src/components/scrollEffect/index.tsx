import styles from './styles.module.css';

const ScrollEffect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.scrollerBox}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            className={styles.item}
            style={{
              left: `max(calc(8rem * 6), 100%)`,
              animationDuration: '20s',
              animationDelay: `calc(20s / 6 * (6 - ${idx + 1}) * -1) `,
            }}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollEffect;
