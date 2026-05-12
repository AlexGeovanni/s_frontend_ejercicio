import styles from "./characterModal.module.css";
import { useEffect, useState } from "react";
import { getCharactersById } from "@/service/rickAndMortyApi";
import type { Character } from "@/types/character";
import { CharacterModalSkeleton } from "@/components/ui/skeleton/characterModalSkeleton";
import Modal from "@/components/ui/modal";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { StarFillIcon, StarIcon } from "@/icons";
import { toggleFavorite } from "@/store/features/favorites/favoritesSlice";

type Props = {
  id: number | null;
  onClose: () => void;
};
export default function CharacterModal({ id, onClose }: Props) {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector((state)=>state.favorites)
  const [data, setData] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setLoading(true);
      setData(null);
      setError(null);
      try {
        const data = await getCharactersById(id);
        setData(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el detalle del personaje");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (!id) return null;

  const handleClose = () => {
    setData(null);
    setError(null);
    setLoading(false);
    onClose();
  };

  const isFavorite = data && favorites.includes(data?.id)

  return (
    <Modal open={!!id} onChange={handleClose}>
      {loading && <CharacterModalSkeleton />}
      {!loading && error && <div className={styles.error}>{error}</div>}
      {!loading && !error && data && (
        <div className={styles.content}>
          <>
            <div className={styles.contentImg}>
              <figure>
                <img className={styles.imgModal} src={data.image} />
              </figure>
              <div className={styles.contentBtnFavorite}>
                <button
                  onClick={() => dispatch(toggleFavorite(id))}
                  className={styles.btnFav}
                >
                  {isFavorite ? (
                    <StarFillIcon />
                  ) : (
                    <StarIcon className={styles.icon} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <h2 className={styles.title}>{data?.name}</h2>
              <div className={styles.tagsGrid}>
                <span className={`${styles.tag} ${styles.tagBlue}`}>
                  <strong>Estado:</strong> {data?.status}
                </span>
                <span className={`${styles.tag} ${styles.tagPurple}`}>
                  <strong>Género:</strong> {data?.gender}
                </span>
                <span className={`${styles.tag} ${styles.tagGreen}`}>
                  <strong>Especie:</strong> {data?.species}
                </span>
                <span className={`${styles.tag} ${styles.tagYellow}`}>
                  <strong>Origen:</strong> {data?.origin?.name}
                </span>
                <span className={`${styles.tag} ${styles.tagOrange}`}>
                  <strong>Ubicación:</strong> {data?.location?.name}
                </span>
              </div>
            </div>
          </>
        </div>
      )}
    </Modal>
  );
}
