import type { ReactNode } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@/icons";

type Props = {
  open: boolean;
  onChange: () => void;
  children: ReactNode;
};

export default function Modal({ open, onChange, children }: Props) {
  return (
    <>
      {open && (
        <div
          className={styles.modal}
          onClick={onChange}
          role="dialog"
          aria-modal="true"
          aria-labelledby="character-name"
        >
          <div
            className={styles.contentModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={onChange}
              aria-label="Cerrar modal"
            >
              CERRAR
              <CloseIcon />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
