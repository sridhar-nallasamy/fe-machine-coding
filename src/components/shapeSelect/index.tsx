import Boxes from './boxes';
import styles from './styles.module.css';

const ShapeSelect = () => {
  const boxesData = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];

  return (
    <div className={styles.rootDiv}>
      <Boxes boxesData={boxesData} />
    </div>
  );
};

export default ShapeSelect;
