import { type ReactElement, useCallback, useRef, useState } from 'react';

import Scroll from './scroll';
import styles from './styles.module.css';

export type FetchDataFn = (
  q: string,
  p: string,
) => Promise<{ docs: ({ title: string } & Record<string, unknown>)[] }>;

export type DataType = Awaited<ReturnType<FetchDataFn>>['docs'];

export type RenderItemFn = (
  d: DataType[number],
  k: string,
  r: ((e: HTMLDivElement) => void) | null,
) => ReactElement;

const InfinityScroll = () => {
  const [inputQuery, setInputQuery] = useState<string>('');
  const [data, setData] = useState<DataType>([]);

  const previousQueryRef = useRef<{ query: string; page: string }>({
    query: '',
    page: '1',
  });
  const controllerRef = useRef<AbortController>(new AbortController());

  const inputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);
  }, []);

  const fetchData = useCallback<FetchDataFn>(async (q, page) => {
    return new Promise((resolve, reject) => {
      const { query: prevQ, page: prevP } = previousQueryRef.current;

      if (prevQ === q && prevP === page) {
        reject(new Error('Same Request Params!'));
        return;
      }

      if (controllerRef.current) controllerRef.current.abort('');

      previousQueryRef.current.query = q;
      previousQueryRef.current.page = page;
      controllerRef.current = new AbortController();

      fetch(
        'https://openlibrary.org/search.json?' +
          new URLSearchParams({ q, page }),
        { signal: controllerRef.current.signal },
      )
        .then(async (response) => {
          const d = (await response.json()) as Awaited<ReturnType<FetchDataFn>>;
          setData((p) => [...p, ...d.docs]);
          resolve(d);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }, []);

  const renderItem = useCallback<RenderItemFn>(({ title }, key, ref) => {
    return (
      <div key={key} ref={ref}>
        {title}
      </div>
    );
  }, []);

  return (
    <div className={styles.rootDiv}>
      <input
        type='text'
        value={inputQuery}
        onChange={inputHandler}
        placeholder='Enter min 3 characters'
        id='infinity-input'
      />
      <Scroll
        {...{ query: inputQuery, fetchData, dataList: data, renderItem }}
      />
    </div>
  );
};

export default InfinityScroll;
