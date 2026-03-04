import { type RouteObject } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() => import('../containers/home'));

const registry: Record<
  string,
  Pick<RouteObject, 'Component' | 'element' | 'path'> & {
    label: string;
  }
> = {
  default: { path: '', Component: Home, label: 'Home' },
};

export { registry };
