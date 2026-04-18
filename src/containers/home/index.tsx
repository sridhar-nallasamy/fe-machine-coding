import { FaReact } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

import styles from './styles.module.css';
import { registry } from '../../constants';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.rootDiv} role='listbox'>
      {Object.values(registry).map(
        ({ path, label }) =>
          path && (
            <div
              className={styles.tile}
              key={path}
              onClick={() => navigate(path)}
              role='listitem'
            >
              {label}
              <div className={styles.iconBox}>
                <FaReact className={styles.reactIcon} />
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default Home;
