import { Children, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';
import useModalRoot from '../../hooks/useModalTree';

import type { ModalFcProps } from './types';

const Modal: React.FC<ModalFcProps> = ({ open, onClose, children, title }) => {
  const modalRoot = useModalRoot();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;

      setTimeout(() => {
        if (!modalRef.current) return;

        const focusable = modalRef.current.querySelector(
          'button, [href], select, input, textarea, [tabindex]:not([tabindex="-1"])',
        ) as HTMLElement;

        if (focusable) {
          focusable.focus();
        } else {
          modalRef.current.focus();
        }
      }, 0);
    } else {
      previousActiveElement.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], select, input, textarea, [tabindex]:not([tabindex="-1"])',
        ) as unknown as HTMLElement[];

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const steps = Children.toArray(children);
  const hasMultipleSteps = steps.length > 1;
  const stepContent = steps[currentStep];

  const titleId = title ? 'modal-title' : undefined;

  if (!open || !modalRoot) return null;

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={() => onClose()}
      role='dialog'
      aria-modal
      aria-labelledby={titleId}
    >
      <div
        ref={modalRef}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className={styles.modalHeader}>
          {title && (
            <h3 className={styles.modalTitle} id={titleId}>
              {title}
            </h3>
          )}
          <button onClick={() => onClose()} aria-label='Close modal'>
            x
          </button>
        </div>
        <div className={styles.modalBody}>{stepContent}</div>
        {hasMultipleSteps && (
          <div className={styles.modalFooter}>
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={!currentStep}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={currentStep >= steps.length - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
