import styles from "./skeleton.module.css"

/**
 * Skeleton that mirrors the layout of a character card in the grid.
 * Use it as a placeholder while character data is loading.
 */
export function CharacterCardSkeleton() {
  return (
    <div
      className={`${styles.cardSkeleton} ${styles.skeleton}`}
      role="status"
      aria-busy="true"
      aria-label="Cargando tarjeta"
      style={{ borderRadius: 8 }}
    >
      <div
        className={`${styles.cardAvatar} ${styles.skeleton} ${styles.circle}`}
      />
      <div className={`${styles.cardLine} ${styles.skeleton}`} />
      <div
        className={`${styles.cardStar} ${styles.skeleton} ${styles.circle}`}
      />
    </div>
  )
}

/**
 * Convenience grid that renders N card skeletons.
 */
export function CharacterCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className={styles.gridSkeleton} aria-label="Cargando tarjetas">
      {Array.from({ length: count }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  )
}