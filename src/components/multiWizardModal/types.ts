export type ModalFcProps = {
  children: React.ReactElement | React.ReactElement[];
  open: boolean;
  onClose: () => void;
  title?: string;
};
