import { createHashRouter } from 'react-router';
import Layout from '../layout';
import ErrorPage from '../error';
import { registry } from '../../constants';

const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: ErrorPage,
    children: [
      ...Object.values(registry).map(({ path, element, Component }) => ({
        path,
        element,
        Component,
      })),
    ],
  },
]);

export default router;
