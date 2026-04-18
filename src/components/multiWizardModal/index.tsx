import { useState } from 'react';

import Modal from './Modal';
import styles from './styles.module.css';

const MultiWizardModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title='Modal'>
        <div>
          <p>Step 1 Content ✅</p>
        </div>
        <div>
          <p>Step 2 Content 👨🏻‍💻</p>
        </div>
        <div>
          <p>Step 3 Content 🔥</p>
        </div>
      </Modal>
    </div>
  );
};

export default MultiWizardModal;
