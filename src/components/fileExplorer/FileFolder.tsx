import { useState } from 'react';
import { CgFileAdd, CgFolderAdd, CgTrash } from 'react-icons/cg';
import { FaCaretRight } from 'react-icons/fa6';
import { FcFile, FcFolder } from 'react-icons/fc';

import styles from './styles.module.css';

import type { FileFolderFCProps, LabelFcProps } from './types';

const Label: React.FC<LabelFcProps> = ({
  data: { id, name, isFolder },
  expandIcon,
  expandController,
  isActionsDisabled,
  deleteHandler,
  addHandler,
}) => {
  return (
    <div
      {...{
        className: styles.labelContainer,
        style: { cursor: isFolder ? 'pointer' : 'default' },
      }}
    >
      <div
        {...{
          ...(isFolder &&
            expandController && {
              role: 'button',
              onClick: () => expandController(),
            }),
        }}
      >
        {expandIcon && expandIcon}
        <p className={styles.label}>
          {isFolder ? <FcFolder size={18} /> : <FcFile size={18} />} {name}
        </p>
      </div>
      {isFolder && (
        <div>
          <button
            onClick={() => addHandler(id, true)}
            disabled={isActionsDisabled}
          >
            <CgFolderAdd size={18} />
          </button>
          <button
            onClick={() => addHandler(id, false)}
            disabled={isActionsDisabled}
          >
            <CgFileAdd size={18} />
          </button>
        </div>
      )}
      <button
        onClick={() => {
          deleteHandler(id);
        }}
        disabled={isActionsDisabled}
      >
        <CgTrash size={18} />
      </button>
    </div>
  );
};

const FileFolder: React.FC<FileFolderFCProps> = ({
  data,
  paddingLeft,
  isActionsDisabled,
  deleteHandler,
  addHandler,
}) => {
  const [isExpand, setIsExpand] = useState(false);

  if (data.isFolder && data.children?.length) {
    return (
      <>
        <Label
          data={data}
          expandIcon={
            <FaCaretRight
              style={{
                transform: `rotate(${isExpand ? 90 : 0}deg)`,
                transition: 'transform 0.2s',
              }}
            />
          }
          expandController={() => setIsExpand((prev) => !prev)}
          isActionsDisabled={isActionsDisabled}
          deleteHandler={deleteHandler}
          addHandler={addHandler}
        />
        {isExpand &&
          data.children.map((childData) => (
            <FileFolder
              key={childData.id}
              data={childData}
              paddingLeft={paddingLeft + 1}
              isActionsDisabled={isActionsDisabled}
              deleteHandler={deleteHandler}
              addHandler={addHandler}
            />
          ))}
      </>
    );
  }

  return (
    <div
      className={styles.fileFolder}
      style={{ paddingLeft: `${paddingLeft}rem` }}
    >
      <Label
        data={data}
        isActionsDisabled={isActionsDisabled}
        deleteHandler={deleteHandler}
        addHandler={addHandler}
      />
    </div>
  );
};

export default FileFolder;
