import {  ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import styles from "./pagination.module.css";
import type { InfoPage } from "@/types/character";

interface Props {
  info: InfoPage | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const getPages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage >= totalPages - 1) {
    return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage, currentPage + 1, "...", totalPages - 1, totalPages];
};

export default function Pagination({ info, currentPage, onPageChange }: Props) {
  const totalPages = info?.pages ?? 0;
  const hasPrev = info?.prev !== null;
  const hasNext = info?.next !== null;
  // Lógica simple: primeras 2 páginas + "..." + últimas 2 páginas
  const pages = getPages(currentPage, totalPages);
  return (
    <div className={styles.contentPagination}>
      <div className={styles.contentbtns}>
        <button
          type="button"
          onClick={() => hasPrev && onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          aria-label="Página anterior"
          className={`${styles.btnPagination} ${styles.btnPrev}`}
        >
          <ArrowLeftIcon className={styles.icon} />
        </button>
        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`dots-${idx}`} className={`${styles.btnPagination}`}>
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`${styles.btnPagination} ${page === currentPage && styles.activePage}`}
            >
              {page}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          aria-label={`Ir a la página ${pages}`}
          disabled={!hasNext}
          className={`${styles.btnPagination}`}
        >
          <ArrowRightIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
