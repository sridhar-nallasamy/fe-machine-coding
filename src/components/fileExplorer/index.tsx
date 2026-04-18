import { useCallback, useState } from 'react';

import FileFolder from './FileFolder';
import styles from './styles.module.css';

import type { FileFolderFCProps, FileFolderProps } from './types';

const initialData: FileFolderProps[] = [
  {
    id: 1,
    name: 'public',
    isFolder: true,
    children: [{ id: 2, name: 'index.html', isFolder: false }],
  },
  {
    id: 3,
    name: 'src',
    isFolder: true,
    children: [
      {
        id: 4,
        name: 'Components',
        isFolder: true,
        children: [{ id: 5, name: 'File.tsx', isFolder: false }],
      },
      { id: 6, name: 'App.ts', isFolder: false },
      { id: 7, name: 'index.ts', isFolder: false },
    ],
  },
  { id: 8, name: 'package.json', isFolder: false },
];

const removeHandler = (
  d: FileFolderProps[],
  id: number,
): { data: FileFolderProps[]; removalCount: number } => {
  const r = [] as FileFolderProps[];
  let removalCount = 0;

  d.forEach((data) => {
    if (data.id === id) {
      return;
    }

    let children;

    if (data.isFolder && data.children) {
      const { data: d, removalCount: c } = removeHandler(data.children, id);
      removalCount = c;
      children = d;
    }

    r.push({ ...data, children });
  });

  return { data: r.length ? r : [], removalCount };
};

const newHandler = (
  data: FileFolderProps[],
  parentId: number,
  id: number,
  name: string,
  isFolder: boolean,
): FileFolderProps[] => {
  return data.map((d) => {
    if (d.id === parentId) {
      const c: FileFolderProps = {
        id,
        name,
        isFolder,
        ...(isFolder && { children: [] }),
      };
      return { ...d, children: [...(d.children ?? []), c] };
    }

    if (d.children) {
      return {
        ...d,
        children: newHandler(d.children, parentId, id, name, isFolder),
      };
    }

    return { ...d };
  });
};

const FileExplorer = () => {
  const [data, setData] = useState(initialData);
  const [idCounter, setIdCounter] = useState(7);
  const [showForm, setShowForm] = useState<'folder' | 'file' | null>(null);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState<number | null>(null);

  const deleteHandler: FileFolderFCProps['deleteHandler'] = useCallback(
    (id) => {
      setData((prev) => {
        const { removalCount, data: d } = removeHandler(prev, id);
        setIdCounter((prevId) => {
          const n = prevId - removalCount;
          return n < 0 ? 0 : n;
        });
        return [...d!];
      });
    },
    [],
  );

  const formHandler: FileFolderFCProps['addHandler'] = useCallback(
    (id, isFolder) => {
      setName('');
      setShowForm(isFolder ? 'folder' : 'file');
      setParentId(id);
    },
    [],
  );

  const addClick = useCallback(() => {
    if (name && parentId) {
      setData((prev) => {
        const r = newHandler(
          prev,
          parentId,
          idCounter,
          name,
          showForm === 'folder',
        );

        return r;
      });
      setParentId(null);
      setName('');
      setShowForm(null);
      setIdCounter((prev) => prev + 1);
    }
  }, [idCounter, name, parentId, showForm]);

  return (
    <div className={styles.container}>
      {data.map((metaData) => (
        <FileFolder
          key={metaData.id}
          data={metaData}
          paddingLeft={0}
          isActionsDisabled={!!showForm}
          deleteHandler={deleteHandler}
          addHandler={formHandler}
        />
      ))}
      {showForm && (
        <div className={styles.formContainer}>
          <h3>Enter {showForm} name:</h3>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <button
              onClick={() => {
                setShowForm(null);
                setName('');
              }}
            >
              Cancel
            </button>
            <button onClick={() => addClick()}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
