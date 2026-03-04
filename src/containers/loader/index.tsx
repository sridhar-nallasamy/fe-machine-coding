import styles from './styles.module.css';
import VgsLogo from '../../assets/VGS.svg';

const Loader = () => {
  return (
    <div className={styles.rootDiv}>
      <img src={VgsLogo} alt='Logo' className={styles.logoImg} />
      <p className={styles.loadingText}>LOADING...</p>
    </div>
  );
};

export default Loader;
