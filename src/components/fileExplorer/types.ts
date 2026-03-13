export type FileFolderProps = {
  id: number;
  name: string;
  isFolder: boolean;
  children?: FileFolderProps[];
};

export type FileFolderFCProps = {
  data: FileFolderProps;
  paddingLeft: number;
  isActionsDisabled: boolean;
  deleteHandler: (id: number) => void;
  addHandler: (id: number, isFolder: boolean) => void;
};

export type LabelFcProps = Omit<FileFolderFCProps, 'paddingLeft'> & {
  expandIcon?: React.ReactNode;
  expandController?: () => void;
};
