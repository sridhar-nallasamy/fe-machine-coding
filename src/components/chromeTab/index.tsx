import { type SVGAttributes } from 'react';

import styles from './styles.module.css';

const Curve: React.FC<SVGAttributes<SVGElement>> = ({ className }) => {
  return (
    <svg
      viewBox='0 0 150 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...{ className }}
    >
      <path d='M 0 200 L 0 0 C 0 0, 0 200, 150 200 Z' />
    </svg>
  );
};

const ChromeTab = () => {
  return (
    <div className={styles.rootDiv}>
      <div className={styles.tabBG}>
        <Curve className={styles.curveLeft} />
        <div className={styles.tabLabelBG}></div>
        <Curve className={styles.curveRight} />
      </div>
    </div>
  );
};

export default ChromeTab;
