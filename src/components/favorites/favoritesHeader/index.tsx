import { HomeIcon } from "@/icons";
import { Link } from "react-router-dom";
import styles from './favoritesHeader.module.css'
export default function FavoritesHeader() {
  return (
    <header>
      <div className={styles.contentTitlePage}>
        <h1>Favoritos</h1>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.btnLink}>
          <span>
            <HomeIcon />
          </span>
          Volver
        </Link>
      </nav>
    </header>
  );
}