import { SearchIcon, StarIcon } from "@/icons";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchCharactersByName } from "@/service/rickAndMortyApi";
export default function Header() {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search.trim()) return;

      searchCharactersByName(search).then((value)=>console.log(value)).catch(console.error);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const onChangeValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
  }

  return (
    <header>
      <div className={styles.contentHeader}>
        <div className={styles.contentSearch}>
          <label htmlFor="search" className={styles.searchLabel}>
            <SearchIcon />
            <input
            onChange={onChangeValue}
              className={styles.labelInput}
              type="text"
              name="search"
              id="search"
              placeholder="Buscar..."
            />
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
