import styles from './styles.module.css';
import VgsLogo from '../../assets/VGS.svg';
import { useLocation, useNavigate } from 'react-router';
import { registry } from '../../constants';
import { FaReact } from 'react-icons/fa6';
// import { FaJsSquare } from 'react-icons/fa';

const Header = () => {
  const { pathname } = useLocation();
  const currentPath = pathname.replace(/^\//g, '');

  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(e.target.value);
  };

  return (
    <header className={styles.rootDiv}>
      <img
        src={VgsLogo}
        alt='Logo'
        className={styles.logoImg}
        onClick={() => {
          navigate('');
        }}
      />
      {currentPath && (
        <div className={styles.selectBox}>
          <select
            value={currentPath}
            onChange={onChangeHandler}
            className={styles.select}
          >
            {Object.values(registry).map(
              ({ path, label }) =>
                path && (
                  <option value={path} key={path}>
                    {label}
                  </option>
                ),
            )}
          </select>
          <FaReact
            className={styles.reactIcon}
            onClick={() => {
              window.open(
                `https://github.com/sridhar-nallasamy/some-fe-stuffs/blob/main/src/components/${currentPath}/index.tsx`,
                '_blank',
              );
            }}
          />
          {/* <FaJsSquare className={styles.jsIcon} /> */}
        </div>
      )}
    </header>
  );
};

export default Header;
