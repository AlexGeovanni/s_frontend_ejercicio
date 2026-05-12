import styles from "./skeleton.module.css"

/**
 * Skeleton that mirrors the character detail modal.
 * Use inside the modal while character details are loading.
 */
export function CharacterModalSkeleton() {
  return (
    <div
      className={`${styles.modalSkeleton} ${styles.skeleton}`} 
      role="status"
      aria-busy="true"
      aria-label="Cargando detalles del personaje"
    >
      <div className={`${styles.modalContent} ${styles.skeleton}`} >Cargando...</div>
    </div>
  )
}
