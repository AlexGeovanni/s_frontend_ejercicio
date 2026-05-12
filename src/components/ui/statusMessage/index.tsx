import styles from "./statusMessage.module.css";

type StatusMessageProps = {
  title: string;
  description?: string;
  variant?: "info" | "error" | "empty";
  actionLabel?: string;
  onAction?: () => void;
};

export default function StatusMessage({
  title,
  description,
  variant = "info",
  actionLabel,
  onAction,
}: StatusMessageProps) {
  return (
    <div
      className={`${styles.statusMessage} ${styles[variant]}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.textContent}>
        <strong className={styles.title}>{title}</strong>
        <p className={styles.description}>{description}</p>
        {actionLabel && onAction && (
          <button type="button" className={styles.button} onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
