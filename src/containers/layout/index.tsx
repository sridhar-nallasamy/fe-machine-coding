import { Outlet } from 'react-router';
import Header from '../header';
import styles from './styles.module.css';
import { Suspense } from 'react';
import Loader from '../loader';

const Layout = () => {
  return (
    <div className={styles.rootDiv}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
