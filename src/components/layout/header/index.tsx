import { SearchIcon, StarIcon } from "@/icons";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <div className={styles.contentHeader}>
        <div className={styles.contentSearch}>
          <label htmlFor="search" className={styles.searchLabel}>
            <SearchIcon />
            <input className={styles.labelInput} type="text" name="search" id="search" placeholder="Buscar..." />
          </label>
        </div>
        <div>
          <Link to="/favorites" className={styles.btnLink}>
            <span>Mis Favoritos</span>
            <span className={styles.LinkIcon}>
              <StarIcon size={20} className={styles.icon} />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
