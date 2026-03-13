import { useRef, useState } from 'react';
import styles from './styles.module.css';
import fruitNames from './data';

const AutoComplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number>(0);

  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const debounce = (func: (q: string) => void, delay: number) => {
    return (query: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        func(query);
      }, delay);
    };
  };

  const getData = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(false);
    setIsApiLoading(true);

    await new Promise<void>((res) => {
      setTimeout(() => {
        res();
      }, 1000);
    });

    setIsApiLoading(false);
    setSuggestions(
      fruitNames
        .filter((name) => name.toLowerCase().includes(query))
        .slice(0, 10),
    );
    setShowSuggestions(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    setValue(newValue);
    debounce(getData, 800)(newValue.toLowerCase());
  };

  const onSelect = (s: string) => {
    setValue(s);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type='text'
        placeholder='Search...'
        value={value}
        onChange={onChange}
        aria-label='input-box'
        aria-controls='suggestions-list'
        aria-autocomplete='list'
        className={styles.inputBox}
      />
      {isApiLoading && <h4 className={styles.loading}>Loading...</h4>}
      {showSuggestions ? (
        <>
          {suggestions.length ? (
            <ul className={styles.listBox} id='suggestions-list' role='listbox'>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  className={styles.listOption}
                  role='option'
                  onClick={() => onSelect(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <ul className={styles.listBox} id='suggestions-list' role='listbox'>
              <li
                className={styles.listOption}
                role='option'
                style={{ cursor: 'default' }}
              >
                No results!
              </li>
            </ul>
          )}
        </>
      ) : null}
    </div>
  );
};

export default AutoComplete;
