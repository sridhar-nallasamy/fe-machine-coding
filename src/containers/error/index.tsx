import { useNavigate } from 'react-router';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import VgsLogo from '../../assets/VGS.svg';

const ErrorPage = () => {
  const [remainingSec, setRemainingSec] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSec((p) => {
        if (p === 0) {
          navigate('');
          return 0;
        }
        return p - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate]);

  return (
    <div className={styles.rootDiv}>
      <div>
        <img
          src={VgsLogo}
          alt='Logo'
          className={styles.logoImg}
          onClick={() => {
            navigate('');
          }}
        />
        <p>The Page you're looking for is invalid❗️</p>
        <p>
          Redirecting to 🏡 Home page in <span>{remainingSec}s</span>.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
