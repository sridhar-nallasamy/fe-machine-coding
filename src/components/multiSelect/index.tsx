import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';
import useModalRoot from '../../hooks/useModalTree';

const ITEMS = [
  { id: '1', label: 'One' },
  { id: '2', label: 'Two' },
  { id: '3', label: 'Three' },
  { id: '4', label: 'Four' },
  { id: '5', label: 'Five' },
];

const MultiSelect = () => {
  const [selected, setSelected] = useState(new Set());
  const rootEl = useModalRoot();
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [cords, setCords] = useState({ top: 0, left: 0, width: 0 });

  useLayoutEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCords({ top: rect.bottom, left: rect.left, width: rect.width });
    }
  }, [isShowOptions]);

  const toggleHandler = (id: string) => {
    setSelected((prev) => {
      const resultSet = new Set(prev);

      if (resultSet.has(id)) {
        resultSet.delete(id);
      } else {
        resultSet.add(id);
      }

      return resultSet;
    });
  };

  useEffect(() => {
    if (!isShowOptions) return;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsShowOptions(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.body.style.overflow = originalOverflow;
    };
  }, [isShowOptions]);

  return (
    <div className={styles.rootBox}>
      <div
        className={`${styles.trigger} ${!selected.size && styles.placeholder}`}
        ref={triggerRef}
        aria-label='multi select'
        onClick={() => setIsShowOptions(true)}
        role='button'
        tabIndex={isShowOptions ? -1 : 0}
        aria-hidden={isShowOptions}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsShowOptions((prev) => !prev);
          }
        }}
      >
        {selected.size ? Array.from(selected).sort().join(', ') : 'Select...'}
      </div>
      {rootEl &&
        isShowOptions &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onClick={() => setIsShowOptions(false)}
          >
            <div
              role='listbox'
              aria-multiselectable
              className={styles.optionsBox}
              style={{
                top: cords.top + 3,
                left: cords.left,
                width: cords.width,
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {ITEMS.map((item) => {
                const isSelected = selected.has(item.id);

                return (
                  <div
                    key={item.id}
                    role='option'
                    onClick={() => {
                      toggleHandler(item.id);
                    }}
                    className={styles.optionItem}
                    style={{
                      ...(isSelected && { backgroundColor: 'darkgreen' }),
                    }}
                  >
                    <input
                      type='checkbox'
                      checked={isSelected}
                      readOnly
                      aria-hidden
                    />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>,
          rootEl,
        )}
    </div>
  );
};

export default MultiSelect;
