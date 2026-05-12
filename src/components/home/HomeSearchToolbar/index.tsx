import { SearchIcon, StarIcon } from "@/icons";
import styles from "./homeSearchToolbar.module.css";
import { Link } from "react-router-dom";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function HomeSearchToolbar({ value, onChange }: Props) {
  return (
    <header>
      <div className={styles.contentTitlePage}>
        <h1>Explorador de personajes de Rick y Morty</h1>
        <p>Explora, busca y filtra personajes en todo el multiverso.</p>
      </div>
      <div className={styles.contentHeader}>
        <div className={styles.contentSearch}>
          <label htmlFor="search" className={styles.searchLabel}>
            <SearchIcon />
            <input
              className={styles.labelInput}
              type="search"
              name="search"
              id="search"
              placeholder="Buscar..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
        <nav>
          <Link to="/favorites" className={styles.btnLink}>
            <span>Mis Favoritos</span>
            <span className={styles.LinkIcon}>
              <StarIcon size={20} className={styles.icon} />
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
