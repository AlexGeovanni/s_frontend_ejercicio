import { ArrowLeft, ArrowRight } from '@/icons';
import styles from './pagination.module.css'

export default function Pagination() {
  return (
    <div className={styles.contentPagination}>
      <div className={styles.contentbtns}>
        <button className={`${styles.btnPagination}`}><ArrowLeft className={styles.icon} /></button>
        <button className={`${styles.btnPagination}`}><ArrowRight className={styles.icon} /></button>
      </div>
    </div>
  );
}
