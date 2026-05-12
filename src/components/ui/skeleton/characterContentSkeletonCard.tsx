import styles from "./skeleton.module.css"

/**
 * Skeleton that mirrors the layout of a character card in the grid.
 * Use it as a placeholder while character data is loading.
 */
export function CharacterContentCardSkeleton() {
  return (
    <div
      className={`${styles.contentCardSkeleton} ${styles.skeleton}`}
      role="status"
      aria-busy="true"
      aria-label="Cargando tarjeta"
      style={{ borderRadius: 8 }}
    >
      <div className={styles.CardSkeleton}>Cargando...</div>
    </div>
  )
}

