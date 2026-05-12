import type { Character } from "@/types/character";
import styles from "./characterCard.module.css";
import { StarFillIcon, StarIcon } from "@/icons";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleFavorite } from "@/store/features/favorites/favoritesSlice";

interface Props {
  character: Character;
  setSelectedId: (id: number) => void;
}

export default function CharacterCard({ character, setSelectedId }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);
  const { id, name, image } = character;
  const isFavorite = favorites.includes(id)
  return (
    <div className={styles.contentCard}>
      <div className={styles.contentImg} onClick={() => setSelectedId(id)}>
        <figure>
          <img className={styles.imgCard} src={image} alt="Girl in a jacket" />
        </figure>
      </div>
      <div>
        <div className={styles.contentInfo}>
          <h2 className={styles.title} onClick={() => setSelectedId(id)}>
            {name}
          </h2>
          <button
            onClick={() => dispatch(toggleFavorite(id))}
            className={styles.btnCard}
          >
            {isFavorite? <StarFillIcon /> : <StarIcon className={styles.icon} />}
          </button>
        </div>
      </div>
    </div>
  );
}
