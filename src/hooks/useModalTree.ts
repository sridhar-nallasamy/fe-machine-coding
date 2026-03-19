import { useEffect, useState } from 'react';

const useModalRoot = () => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('modal-root');

    const updateEl = (rootEl: HTMLElement | null) => {
      if (!rootEl) {
        rootEl = document.createElement('div');
        rootEl.id = 'modal-root';
        document.body.appendChild(rootEl);
      }

      setModalRoot(rootEl);
    };

    updateEl(root);

    return () => {
      if (root && !root.childNodes.length) {
        document.body.removeChild(root);
      }
    };
  }, []);

  return modalRoot;
};

export default useModalRoot;
