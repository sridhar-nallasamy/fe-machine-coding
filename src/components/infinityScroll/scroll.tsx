/* eslint-disable react-hooks/refs */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { DataType, FetchDataFn, RenderItemFn } from '.';
import styles from './styles.module.css';

const Scroll: React.FC<{
  query: string;
  fetchData: FetchDataFn;
  dataList: DataType;
  renderItem: RenderItemFn;
}> = ({ query, fetchData, dataList, renderItem }) => {
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  const page = useRef<number>(1);

  const getData = useCallback(() => {
    if (query && query.length > 2) {
      setIsApiLoading(true);
      fetchData(query, page.current.toString())
        .catch((e) => {
          if (e.message) console.error(e.message);
        })
        .finally(() => {
          setIsApiLoading(false);
        });
    }
  }, [fetchData, query]);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementObserver = useCallback(
    (element: HTMLDivElement) => {
      if (isApiLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          page.current += 1;
          getData();
        }
      });

      if (element) observer.current.observe(element);
    },
    [getData, isApiLoading],
  );

  useEffect(() => {
    getData();
  }, [getData]);

  const render = useCallback(() => {
    return dataList.map((datum, idx) => {
      if (idx === dataList.length - 1)
        return renderItem(datum, `${datum.title}-${idx}`, lastElementObserver);
      return renderItem(datum, `${datum.title}-${idx}`, null);
    });
  }, [dataList, lastElementObserver, renderItem]);

  return (
    <div>
      <>{render()}</>
      {isApiLoading && <p className={styles.loader}>LOADING...</p>}
    </div>
  );
};

export default Scroll;
