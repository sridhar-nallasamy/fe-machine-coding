import { type RouteObject } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() => import('../containers/home'));
const AutoComplete = lazy(() => import('../components/autoComplete'));
const Calendar = lazy(() => import('../components/calendar'));
const ChromeTab = lazy(() => import('../components/chromeTab'));

const registry: Record<
  string,
  Pick<RouteObject, 'Component' | 'element' | 'path'> & {
    label: string;
  }
> = {
  default: { path: '', Component: Home, label: 'Home' },
  autoComplete: {
    path: 'autoComplete',
    Component: AutoComplete,
    label: 'Auto Complete',
  },
  calender: {
    path: 'calendar',
    Component: Calendar,
    label: 'Calendar',
  },
  chromeTab: {
    path: 'chromeTab',
    Component: ChromeTab,
    label: 'Chrome Tab',
  },
};

export { registry };
