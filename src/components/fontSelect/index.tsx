import { FaAngleDown } from 'react-icons/fa6';
import styles from './styles.module.css';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import useModalRoot from '../../hooks/useModalTree';
import { createPortal } from 'react-dom';

const FontSelect = () => {
  const rootEl = useModalRoot();

  const selectRef = useRef<HTMLDivElement | null>(null);
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [cords, setCords] = useState({ top: 0, left: 0, width: 0 });
  const options = useMemo(() => {
    const fonts = [
      {
        name: 'Open Sans',
        id: 'open-sans-font',
        url: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap',
      },
      {
        name: 'Robato',
        id: 'robato-font',
        url: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      },
      {
        name: 'Oswald',
        id: 'oswald-font',
        url: 'https://fonts.googleapis.com/css2?family=Oswald&display=swap',
      },
      {
        name: 'Smooch Sans',
        id: 'smooch-sans-font',
        url: 'https://fonts.googleapis.com/css2?family=Smooch+Sans&display=swap',
      },
      {
        name: 'Datatype',
        id: 'datatype-font',
        url: 'https://fonts.googleapis.com/css2?family=Datatype&display=swap',
      },
      {
        name: 'Bitcount Ink',
        id: 'bitcount-ink-font',
        url: 'https://fonts.googleapis.com/css2?family=Bitcount+Ink&display=swap',
      },
      {
        name: 'JetBrains Mono',
        id: 'jetbrains-mono-font',
        url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap',
      },
      {
        label: 'தமிழ்',
        name: 'Anek Tamil',
        id: 'anek-tamil-font',
        url: 'https://fonts.googleapis.com/css2?family=Anek+Tamil&display=swap',
      },
    ];
    fonts.sort((a, b) => a.name.localeCompare(b.name));
    return fonts;
  }, []);
  const [font, setFont] = useState<(typeof options)[number]>(options[0]);

  useLayoutEffect(() => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setCords({ top: rect.bottom, left: rect.left, width: rect.width });
    }
  }, [isShowOptions]);

  useEffect(() => {
    const loadFont = async () => {
      for (const fontData of options) {
        if (!document.head.querySelector(`link#${fontData.id}`)) {
          const link = document.createElement('link') as HTMLLinkElement;
          link.href = fontData.url;
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.id = fontData.id;
          document.head.appendChild(link);
        }
      }
    };
    loadFont();
  }, [options]);

  const onChangeHandler = (selectedFont: typeof font) => {
    setFont(selectedFont);
    setIsShowOptions(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.label}>Select Font:</p>
        <div
          ref={selectRef}
          id='font-select'
          style={{ fontFamily: font.name }}
          className={styles.select}
          onClick={() => setIsShowOptions(true)}
          role='button'
          aria-hidden={isShowOptions}
        >
          <p>{font.label ?? font.name}</p>
          <FaAngleDown
            className={styles.selectIcon}
            style={{ transform: `rotate(${isShowOptions ? '180' : '0'}deg)` }}
          />
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
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={styles.selectOptionBox}
                style={{
                  top: cords.top,
                  left: cords.left,
                  width: cords.width,
                }}
              >
                {options.map((o) => (
                  <div
                    key={o.url}
                    style={{ fontFamily: o.name, fontWeight: 700 }}
                    onClick={() => onChangeHandler(o)}
                    className={styles.selectOption}
                  >
                    {o.label ?? o.name}
                  </div>
                ))}
              </div>
            </div>,
            rootEl,
          )}
      </div>
    </div>
  );
};

export default FontSelect;
