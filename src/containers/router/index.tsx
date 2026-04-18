import { createHashRouter } from 'react-router';

import { registry } from '../../constants';
import ErrorPage from '../error';
import Layout from '../layout';

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
