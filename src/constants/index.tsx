import { type RouteObject } from 'react-router';
import { lazy } from 'react';

const Home = lazy(() => import('../containers/home'));
const AutoComplete = lazy(() => import('../components/autoComplete'));
const Calendar = lazy(() => import('../components/calendar'));
const ChromeTab = lazy(() => import('../components/chromeTab'));
const DrawCircle = lazy(() => import('../components/drawCircle'));
const FileExplorer = lazy(() => import('../components/fileExplorer'));
const FontSelect = lazy(() => import('../components/fontSelect'));
const GrailLayout = lazy(() => import('../components/grailLayout'));

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
  drawCircle: {
    path: 'darwCircle',
    Component: DrawCircle,
    label: 'Draw Circle',
  },
  fileExplorer: {
    path: 'fileExplorer',
    Component: FileExplorer,
    label: 'File Explorer',
  },
  fontSelect: {
    path: 'fontSelect',
    Component: FontSelect,
    label: 'Font Select',
  },
  grailLayout: {
    path: 'grailLayout',
    Component: GrailLayout,
    label: 'Grail Layout',
  },
};

export { registry };
